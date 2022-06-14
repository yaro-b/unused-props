import { Dispatch } from "redux"
import {
  useDispatch as useDispatchUntyped,
  useSelector as useSelectorUntyped,
} from "react-redux"

import { AppAction } from "./actions"
import { AppState } from "./reducers"

export const useDispatch = (): Dispatch<AppAction> =>
  useDispatchUntyped<Dispatch<AppAction>>()

export const useSelector = <T>(selector: (state: AppState) => T): T =>
  useSelectorUntyped(selector)
