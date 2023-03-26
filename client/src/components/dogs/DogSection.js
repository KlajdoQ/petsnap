import React,{useState,useEffect} from 'react'
import DogsHeader from './DogsHeader'
import DogFact from './DogFact'

export default function DogFactsList() {
  const [dogFact, setDogFact] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/dogFacts')
    .then(response => response.json())
    .then(setDogFact)
  },[])
return (
    <div className='hide-dog-section'>
      <DogsHeader className='dog-header'/>
     <ol>
        {
          dogFact.map(fact => (
            <DogFact className='dog-head'fact={fact} key={fact.id}/>
          ))
        }
     </ol>
    </div>
  )
}

