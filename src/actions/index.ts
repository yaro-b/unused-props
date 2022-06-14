import { DATA_RECEIVED, PERSON_SELECTED } from "../constants"

type DataReceivedAction = { type: typeof DATA_RECEIVED; data: unknown }
export const dataReceived = (data: unknown): DataReceivedAction => ({
  type: DATA_RECEIVED,
  data,
})

type PersonSelectedAction = { type: typeof PERSON_SELECTED; id: string }
export const personSelected = (id: string): PersonSelectedAction => ({
  type: PERSON_SELECTED,
  id,
})

export type AppAction = DataReceivedAction | PersonSelectedAction
