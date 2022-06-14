import React, { useEffect } from "react"
import { createGlobalStyle } from "styled-components"

import { useDispatch, useSelector } from "../typed"
import { dataReceived } from "../actions"
import Loader from "./Loader"
import Content from "./Content"
import Proxy from "./Proxy"

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
    font-size: 14px;
  }

  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("/fixtures/data.json")
      .then((response) => response.json())
      .then((data) => setTimeout(() => dispatch(dataReceived(data)), 1000))
  }, [dispatch])

  const loaded = useSelector((state) => state.ui.loaded)

  return (
    <>
      <GlobalStyle />
      {!loaded ? <Loader /> : <Content />}
      <Proxy />
    </>
  )
}

export default App
