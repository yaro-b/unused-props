import { AppAction } from "../../actions"
import { DATA_RECEIVED, PERSON_SELECTED } from "../../constants"

export type UiState = {
  loaded: boolean
  selectedPersonId: string | null
}

const initialState: UiState = {
  loaded: false,
  selectedPersonId: null,
}

const uiReducer = (state = initialState, action: AppAction): UiState => {
  switch (action.type) {
    case DATA_RECEIVED: {
      return {
        loaded: true,
        selectedPersonId: null,
      }
    }
    case PERSON_SELECTED: {
      return {
        ...state,
        selectedPersonId: action.id,
      }
    }
    default: {
      return state
    }
  }
}

export default uiReducer
