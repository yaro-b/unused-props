import React from "react"
import styled from "styled-components"

import { useDispatch, useSelector } from "../typed"
import { personSelected } from "../actions"
import { Info, Name } from "./StyledCommon"

const ListItem = styled.li`
  list-style: none;
  padding: 10px;
  color: #000;
  background-color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  :last-child {
    border-bottom: none;
  }
`

const ListItemSelected = styled(ListItem)`
  color: #fff;
  background-color: #06f;
`

type Props = {
  id: string
}

const Person: React.FunctionComponent<Props> = ({ id }: Props) => {
  const person = useSelector((state) => state.entities.people.byId[id]!)
  const dispatch = useDispatch()
  const onPersonClick = () => dispatch(personSelected(person.id))

  const selectedPersonId = useSelector((state) => state.ui.selectedPersonId)
  const Item = id === selectedPersonId ? ListItemSelected : ListItem

  return (
    <Item onClick={onPersonClick}>
      <Name>{person.name}</Name>
      <Info>
        {person.age} • {person.occupation}
      </Info>
    </Item>
  )
}

export default Person
