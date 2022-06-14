import React from "react"
import styled from "styled-components"

import { useSelector } from "../typed"
import People from "./People"
import Cat from "./Cat"

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 25px;
  display: flex;
`

const Content: React.FunctionComponent = () => {
  const selectedPersonId = useSelector((state) => state.ui.selectedPersonId)

  return (
    <Container>
      <People />
      {!selectedPersonId ? null : <Cat ownerId={selectedPersonId} />}
    </Container>
  )
}

export default Content
