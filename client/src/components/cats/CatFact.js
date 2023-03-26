import React from 'react'
import styled from 'styled-components'

// Create a styled component for the CatFactDiv
const CatFactDiv = styled.li`
  margin-left: 20px;
  margin-bottom: 30px;
`;

// Create a functional component for the CatFact
export default function CatFact({ fact }) {
  return (
        // Use the styled component to render the fact
    <CatFactDiv>
        {fact.fact}
    </CatFactDiv>
  )
}
