import React, {useState, useEffect} from 'react'
import CatFact from './CatFact'
import CatsHeader from './CatsHeader'
import styled from 'styled-components'
import catFacts from './catsFacts.json'


// Create a functional component for the CatFactsList
export default function CatFactsList() {
    // Use useState hook to manage the state for facts
  const [facts, setFacts] = useState([])

  // Use useEffect hook to fetch the facts from an API
  useEffect(() => {
    setFacts(catFacts.catFacts);
  }, []);

  // Render the Wrapper component which contains the CatsHeader and the List of CatFacts
  return ( 
    <Wrapper>
      <CatsHeader />
      <List>
        {facts.map(fact => (
          <CatFact key={fact} fact={fact}/>
        ))}
      </List>
    </Wrapper>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const Wrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:top;
  flex-direction:column;
  width: 360px;
  border-radius:5px;
  margin-left:60px;
  margin-top:-120px;
  background-color:white;
  padding:20px;
  height: 600px;
  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.3);
  @media (max-width:600px) {
    display:none;
  }
`
const List = styled.ol`
  display: flex;
  flex-direction: column;
`