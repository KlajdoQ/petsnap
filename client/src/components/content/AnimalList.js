import React, { useState } from 'react'
import AnimalDetail from './AnimalDetail'
import styled from 'styled-components'


export default function AnimalList({ newMessage, setNewMessage,animals, addLikes ,setAnimals , addNewAnimal, setUser}) {
  const [displayCount, setDisplayCount] = useState(5)

  const allanimals = animals
    .slice(0, displayCount)
    .map((animal) => (
      <AnimalDetail 
        animal={animal}
        key={animal.id}
        addLikes={addLikes}
        setAnimals={setAnimals}
        addNewAnimal={addNewAnimal}
        setUser={setUser}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    ))

  
  function showMore() {
    setDisplayCount(displayCount + 5)
  }

  return (
    <ListOfAnimals>
      <>
        {allanimals}
        <AddMoreDiv>
          <AddMoreBtn onClick={showMore}>
            Show More
          </AddMoreBtn>
        </AddMoreDiv>
      </>
    </ListOfAnimals>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const ListOfAnimals = styled.div 
`display:flex;
flex-direction: column;
align-items: center;
justify-content: center;`

const AddMoreDiv = styled.div 
`  margin-bottom:30px;
display: flex;
align-items: center;
justify-content: center;`

const AddMoreBtn = styled.div 
`padding:5px 15px;
border:none;
font-weight: 600;
background-color:lightgray;
border-radius:5px;
cursor:pointer;`