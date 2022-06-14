import React from "react"
import styled from "styled-components"

const Center = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader: React.FunctionComponent = () => <Center>Loading...</Center>

export default Loader
