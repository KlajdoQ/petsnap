import React, { useEffect} from 'react'
import AnimalList from './AnimalList'
import styled from 'styled-components'
import CatSection from '../cats/CatSection'
import AnimalForm from './AnimalForm'
import './Content.css'
import ChatModal from './ChatModal'

export default function Content({newMessage, setNewMessage, search, animals, setAnimals, addNewAnimal, setUser}) {
  
  useEffect(() => {
    fetch("http://localhost:3000/animals")
      .then((response) => response.json())
      .then(setAnimals)
      .catch((error) => console.error(error));
  }, []);

  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content-box">
      <AnimalForm addNewAnimal={addNewAnimal} animals={animals} setAnimals={setAnimals}/>
      <ContentDiv >
        <AnimalList 
            animals={filteredAnimals} 
            setAnimals={setAnimals}
            setUser={setUser}
            newMessage={newMessage}
            setNewMessage={setNewMessage}/>
        {/* <CatSection/> */}
     
      </ContentDiv>
    </div>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const ContentDiv= styled.div 
`  display:grid;
grid-template-columns: auto  auto auto;
margin-top:30px;
position:relative;
;

`


