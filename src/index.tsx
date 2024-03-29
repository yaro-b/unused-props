import React from "react"
import { render } from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"

import appReducer from "./reducers"
import App from "./components/App"

const store = createStore(appReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app"),
)
