import React, {useState, useEffect} from 'react'
import CatFact from './CatFact'
import CatsHeader from './CatsHeader'
import styled from 'styled-components'


// Create a functional component for the CatFactsList
export default function CatFactsList() {
    // Use useState hook to manage the state for facts
  const [facts, setFacts] = useState([])

  // Use useEffect hook to fetch the facts from an API
  useEffect(() =>{
    fetch('https://cat-fact.herokuapp.com/facts')
    .then((response) =>response.json())
    .then(setFacts)
  },[])

  // Render the Wrapper component which contains the CatsHeader and the List of CatFacts
  return ( 
    <Wrapper>
      <CatsHeader />
      <List>
        {facts.map(fact => (
          <CatFact key={fact.text} fact={fact}/>
        ))}
      </List>
    </Wrapper>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const Wrapper = styled.div`
  width: 400px;
  height: 530px;
  border-radius:10px;
  margin-left:60px;
  background-color:white;
  @media (max-width:600px) {
    display:none;
  }
`
const List = styled.ol`
  display: flex;
  flex-direction: column;
`