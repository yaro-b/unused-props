import { AppAction } from "../../../actions"
import { DATA_RECEIVED } from "../../../constants"
import { createProxy } from "../../../proxy"

type Person = {
  id: string
  name: string
  age: number
  occupation: string
}

export type PeopleState = {
  ids: string[]
  byId: { [id: string]: Person }
}

export const initialState: PeopleState = {
  ids: [],
  byId: {},
}

const peopleReducer = (
  state = initialState,
  action: AppAction,
): PeopleState => {
  switch (action.type) {
    case DATA_RECEIVED: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const people = ((action.data as any).people as Person[]).map(createProxy)

      return {
        ids: people.map(({ id }) => id),
        byId: people.reduce(
          (byId, person) => ({ ...byId, [person.id]: person }),
          {},
        ),
      }
    }
    default: {
      return state
    }
  }
}

export default peopleReducer
