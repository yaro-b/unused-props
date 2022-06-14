import { AppAction } from "../../../actions"
import { DATA_RECEIVED } from "../../../constants"
import { createProxy } from "../../../proxy"

type Cat = {
  id: string
  name: string
  breed: string
  photo: string
  favoriteFood: string
  weight: string
  ownerId: string
}

export type CatsState = {
  byOwnerId: { [id: string]: Cat }
}

export const initialState: CatsState = {
  byOwnerId: {},
}

const catsReducer = (state = initialState, action: AppAction): CatsState => {
  switch (action.type) {
    case DATA_RECEIVED: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cats = ((action.data as any).cats as Cat[]).map(createProxy)

      return {
        byOwnerId: cats.reduce(
          (byOwnerId, cat) => ({
            ...byOwnerId,
            [cat.ownerId]: cat,
          }),
          {},
        ),
      }
    }
    default: {
      return state
    }
  }
}

export default catsReducer
