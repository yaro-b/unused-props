import React from "react"
import styled from "styled-components"

import { useSelector } from "../typed"
import { Info, Name } from "./StyledCommon"

const Container = styled.div`
  padding: 10px 10px 10px 25px;
  flex: 70% 0 0;
`

const Image = styled.img`
  width: 300px;
  margin-top: 10px;
`

type Props = {
  ownerId: string
}

const Cat: React.FunctionComponent<Props> = ({ ownerId }: Props) => {
  const cat = useSelector((state) => state.entities.cats.byOwnerId[ownerId]!)

  return (
    <Container>
      <Name>{cat.name}</Name>
      <Info>
        {cat.breed} • {cat.favoriteFood}
      </Info>
      <Image src={cat.photo} />
    </Container>
  )
}

export default Cat
