import React from 'react'
import styled from 'styled-components'


export default function CatFact({ fact }) {
  return (
    <CatFactDiv>
        {fact.fact}
    </CatFactDiv>
  )
}


const CatFactDiv = styled.li`
  margin-left: 20px;
  margin-bottom: 30px;
`;
