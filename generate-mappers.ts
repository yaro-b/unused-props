import { readFileSync, writeFileSync } from "fs"
import { join as joinPaths } from "path"

import { EntityPropsMeta, PropsMetaSplit } from "./src/proxy"

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const generateMapper = (
  [nameSingular, namePlural]: [string, string],
  props: PropsMetaSplit,
): string => `import { ${capitalize(nameSingular)} } from "."

type ResultSuccess<T> = {
  hasErrors: false
  value: T
}

type ResultFailure = {
  hasErrors: true
  errors: string[]
}

type Result<T> = ResultSuccess<T> | ResultFailure

const isNonNullObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === "object" && obj !== null

const map${capitalize(
  nameSingular,
)} = (${nameSingular}: unknown): Result<${capitalize(nameSingular)}> => {
  if (!isNonNullObject(${nameSingular})) {
    return {
      hasErrors: true,
      errors: ["${capitalize(
        namePlural,
      )} mapper: ${nameSingular} is not an object"],
    }
  }

  const errors = [${props.used
    .map((prop) => `"${prop}"`)
    .join(", ")}].flatMap((prop) =>
    typeof ${nameSingular}[prop] !== "undefined"
      ? []
      : [\`${capitalize(
        namePlural,
      )} mapper: \${prop} property is not definied\`],
  )

  if (errors.length) {
    return {
      hasErrors: true,
      errors,
    }
  }

  return {
    hasErrors: false,
    value: {
      ${props.used
        .map((prop) => `${prop}: ${nameSingular}.${prop} as any,`)
        .join("\n      ")}
    },
  }
}

export const map${capitalize(
  namePlural,
)} = (${namePlural}: unknown[]): ${capitalize(nameSingular)}[] => {
  const results = ${namePlural}.map(map${capitalize(nameSingular)})
  const values = results.flatMap((result) =>
    result.hasErrors ? [] : [result.value],
  )
  const errors = [
    ...new Set(
      results.flatMap((result) => (!result.hasErrors ? [] : result.errors)),
    ),
  ]
  if (errors.length) {
    console.error(errors)
  }

  return values
}
`

const generateTestSuite = (
  [nameSingular, namePlural]: [string, string],
  props: PropsMetaSplit,
): string => `import { map${capitalize(namePlural)} } from "./mapper"

describe("map${capitalize(namePlural)}", () => {
  let spyOnConsole: jest.SpyInstance

  beforeEach(() => {
    spyOnConsole = jest.spyOn(console, "error")
  })

  afterEach(() => {
    spyOnConsole.mockRestore()
  })

  it("returns error when called with undefined", () => {
    expect(map${capitalize(namePlural)}([undefined])).toEqual([])

    expect(console.error).toHaveBeenCalledWith([
      "${capitalize(namePlural)} mapper: ${nameSingular} is not an object",
    ])
  })

  it("returns error when called with null", () => {
    expect(map${capitalize(namePlural)}([null])).toEqual([])

    expect(console.error).toHaveBeenCalledWith([
      "${capitalize(namePlural)} mapper: ${nameSingular} is not an object",
    ])
  })

  it("returns errors when called with empty object", () => {
    expect(map${capitalize(namePlural)}([{}])).toEqual([])

    expect(console.error).toHaveBeenCalledWith([
      ${props.used
        .map(
          (prop) =>
            `"${capitalize(
              namePlural,
            )} mapper: ${prop} property is not definied",`,
        )
        .join("\n      ")}
    ])
  })

  ${props.used
    .map(
      (prop) => `it("returns error when ${prop} is missing", () => {
    expect(
      map${capitalize(namePlural)}([
        {
          ${props.used
            .filter((usedProp) => usedProp !== prop)
            .map((prop) => `${prop}: "test-${prop}",`)
            .join("\n          ")}
        },
      ]),
    ).toEqual([])

    expect(console.error).toHaveBeenCalledWith([
      "${capitalize(namePlural)} mapper: ${prop} property is not definied",
    ])
  })`,
    )
    .join("\n\n  ")}

  it("dedupes errors", () => {
    expect(map${capitalize(
      namePlural,
    )}([undefined, null, {}, {}, {}])).toEqual([])

    expect(console.error).toHaveBeenCalledWith([
      "${capitalize(namePlural)} mapper: ${nameSingular} is not an object",
      ${props.used
        .map(
          (prop) =>
            `"${capitalize(
              namePlural,
            )} mapper: ${prop} property is not definied",`,
        )
        .join("\n      ")}
    ])
  })

  it("ignores unused properties", () => {
    expect(
      map${capitalize(namePlural)}([
        {
          ${[...props.used, ...props.unused]
            .map((prop) => `${prop}: "test-${prop}",`)
            .join("\n          ")}
        },
      ]),
    ).toEqual([
      {
        ${props.used
          .map((prop) => `${prop}: "test-${prop}",`)
          .join("\n        ")}
      },
    ])

    expect(console.error).not.toHaveBeenCalled()
  })
})
`

const entities: EntityPropsMeta[] = JSON.parse(
  readFileSync("props-meta.json", "utf-8"),
)

entities.forEach(({ names, path, props }) => {
  const mapper = generateMapper(names, props)
  writeFileSync(joinPaths(path, "mapper.ts"), mapper)

  const testSuite = generateTestSuite(names, props)
  writeFileSync(joinPaths(path, "mapper.test.ts"), testSuite)
})
