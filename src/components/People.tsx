import React from "react"
import styled from "styled-components"

import { useSelector } from "../typed"
import Person from "./Person"

const List = styled.ul`
  margin: 0;
  padding: 0;
  flex: 30% 0 0;
`

const People: React.FunctionComponent = () => {
  const peopleIds = useSelector((state) => state.entities.people.ids)

  return (
    <List>
      {peopleIds.map((id) => (
        <Person key={id} id={id} />
      ))}
    </List>
  )
}

export default People
