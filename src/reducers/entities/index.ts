import { combineReducers } from "redux"

import people, { PeopleState } from "./people"
import cats, { CatsState } from "./cats"

export type EntitiesState = {
  people: PeopleState
  cats: CatsState
}

const entitiesReducer = combineReducers<EntitiesState>({
  people,
  cats,
})

export default entitiesReducer
