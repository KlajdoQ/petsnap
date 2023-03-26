import React,{useState,useEffect} from 'react'
import DogsHeader from './DogsHeader'
import DogFact from './DogFact'
import dogFacts from './dogFacts.json';
import styled from 'styled-components'


export default function DogFactsList() {
  const [dogFact, setDogFact] = useState([])

  
  useEffect(() => {
    setDogFact(dogFacts.dogFacts);
  }, []);

return (
    <Wrappers className='hide-dog-section'>
      <DogsHeader className='dog-header'/>
     <List>
        {
          dogFact.slice(0,5).map(fact => (
            <DogFact className='dog-head'fact={fact} key={fact.id}/>
          ))
        }
     </List>
    </Wrappers>
  )
}

const Wrappers = styled.div`
  display:flex;
  align-items:center;
  justify-content:top;
  flex-direction:column;
  width: 360px;
  height: 600px;
  border-radius:5px;
  background-color:white;
  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.3);
  margin-right:60px;
  margin-top:-120px;
  @media (max-width:600px) {
    display:none;
  }
`
const List = styled.ol`
  display: flex;
  flex-direction: column;`