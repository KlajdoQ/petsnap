import React from 'react'
import styled from 'styled-components'

export default function DogFact({fact}) {
  return (
    <DogFactLi>
      <li> {fact.text}</li>
    </DogFactLi>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const DogFactLi = styled.div
` margin-left:20px;
margin-right:-60px;
width:250px;
height:90px;`