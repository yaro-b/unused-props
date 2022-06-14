type Entity = Record<string, unknown>
type PropsMeta = Record<string, boolean>
export type PropsMetaSplit = {
  used: string[]
  unused: string[]
}
export type EntityPropsMeta = {
  names: [string, string]
  path: string
  props: PropsMetaSplit
}

const PropsMetaSymbol = Symbol("PropsMeta")

export const createProxy = <T extends Entity>(target: T): T => {
  const propsMeta = Object.keys(target).reduce(
    (obj, prop) => ({ ...obj, [prop]: false }),
    {} as PropsMeta,
  )

  const handler = {
    get: (target: T, prop: string | typeof PropsMetaSymbol) => {
      if (prop === PropsMetaSymbol) {
        return propsMeta
      }
      if (prop in propsMeta && !propsMeta[prop]) {
        propsMeta[prop] = true
      }
      return target[prop]
    },
  }

  return new Proxy(target, handler)
}

export const extractPropsMeta = <
  T extends Entity & { [PropsMetaSymbol]?: PropsMeta }
>(
  entities: T[],
): PropsMetaSplit => {
  const [usedProps, unusedProps] = entities
    .flatMap((entity) => Object.entries(entity[PropsMetaSymbol] ?? {}))
    .reduce(
      ([usedProps, unusedProps], [prop, hasBeenUsed]) => {
        if (!hasBeenUsed && !usedProps.has(prop)) {
          unusedProps.add(prop)
        } else {
          unusedProps.delete(prop)
          usedProps.add(prop)
        }

        return [usedProps, unusedProps]
      },
      [new Set<string>(), new Set<string>()],
    )

  return {
    used: [...usedProps],
    unused: [...unusedProps],
  }
}
