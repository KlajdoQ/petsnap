import React, { useState } from 'react'
import AnimalDetail from './AnimalDetail'
import styled from 'styled-components'


export default function AnimalList({ newMessage, setNewMessage,animals, addLikes ,setAnimals , addNewAnimal, setUser}) {
    // displayCount state to determine how many animals are displayed
  const [displayCount, setDisplayCount] = useState(5)

    // allAnimals array maps over the first 5 animals or the setDisplayCount 
  const allanimals = animals
    .slice(0, displayCount)
    .map((animal) => (
            // For each animal, return a new AnimalDetail component with specific props.
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

  
    // Show 5 more animals when 'show more' button is clicked
  function showMore() {
    setDisplayCount(displayCount + 5)
  }

    // Return the ListOfAnimals component that contains all animal detail components.
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