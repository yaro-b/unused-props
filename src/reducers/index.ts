import { combineReducers } from "redux"

import entities, { EntitiesState } from "./entities"
import ui, { UiState } from "./ui"

export type AppState = {
  entities: EntitiesState
  ui: UiState
}

const appReducer = combineReducers<AppState>({
  entities,
  ui,
})

export default appReducer
