import { readFileSync, writeFileSync } from "fs"
import { join as joinPaths } from "path"

import { EntityPropsMeta, PropsMetaSplit } from "./src/proxy"

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const addTypeExport = ([nameSingular]: [string, string]) => (
  input: string,
): string =>
  input.replace(
    new RegExp(String.raw`(^type ${capitalize(nameSingular)} = {)`, "m"),
    "export $1",
  )

const stripUnusedTypeProps = (
  [nameSingular]: [string, string],
  props: PropsMetaSplit,
) => (input: string): string =>
  input.replace(
    new RegExp(String.raw`(type ${capitalize(nameSingular)} = {)([^}]+)(})`),
    (_, blockTop: string, blockBody: string, blockBottom: string) =>
      `${blockTop}${blockBody.replace(
        new RegExp(String.raw`\s+(${props.unused.join("|")}): \w+`, "g"),
        "",
      )}${blockBottom}`,
  )

const injectMapper = ([, namePlural]: [string, string]) => (
  input: string,
): string =>
  input
    .replace(
      /import { createProxy } from .+/,
      `import { map${capitalize(namePlural)} } from "./mapper"

const isNonNullObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === "object" && obj !== null`,
    )
    .replace(
      /.+eslint-disable-next-line.+\n(\s+)const (\w+) =.+createProxy.+/,
      `$1const $2 =
$1  !isNonNullObject(action.data) || !Array.isArray(action.data.$2)
$1    ? []
$1    : map${capitalize(namePlural)}(action.data.$2)`,
    )

const entities: EntityPropsMeta[] = JSON.parse(
  readFileSync("props-meta.json", "utf-8"),
)

entities.forEach(({ names, path, props }) => {
  const sourcePath = joinPaths(path, "index.ts")
  const sourceInput = readFileSync(sourcePath, "utf-8")

  const sourceOutput = [
    stripUnusedTypeProps(names, props),
    addTypeExport(names),
    injectMapper(names),
  ].reduce((input, fn) => fn(input), sourceInput)

  writeFileSync(sourcePath, sourceOutput)
})
