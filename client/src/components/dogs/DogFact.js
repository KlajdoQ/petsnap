import React from 'react'
import styled from 'styled-components'

export default function DogFact({fact}) {
  return (
    <DogFactLi>
      <li> {fact.fact}</li>
    </DogFactLi>
  )
}


/*******************************
*   STYLED COMPONENTS          *
*******************************/
const DogFactLi = styled.div` 
width:250px;
height:90px;`