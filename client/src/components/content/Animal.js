import React, {useState} from 'react'
import Paw from '../images/paw.png'
import AddComment from './AddComment'
import ShareButton from './ShareButton'
import styled from 'styled-components'
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './Animal.css'



export default function Animal({animal,setAnimals,setUser, addLikes,newMessage,setNewMessage,}) {
    
    const { user} = useContext(UserContext); 
    const { name, image, hobbies, breed, likes, comments } = animal;
    const [showComments, setshowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
  
  function handleClick() {
    const userLikes = animal.likes.filter((like) => like.user_id === user.id);
    if (userLikes.length === 0) {
      const newLikes = [...animal.likes, { user_id: user.id }];
      setIsLiked(true);
      const updatedAnimal = { ...animal, likes: newLikes };
      setAnimals((prevAnimals) => {
        return prevAnimals.map((prevAnimal) => {
          if (prevAnimal.id === updatedAnimal.id) {
            return updatedAnimal;
          } else {
            return prevAnimal;
      }
        });
      });
      addLikes(updatedAnimal);
    } else {
      const likeIndex = animal.likes.findIndex(
        (like) => like.user_id === user.id
      );
      const newLikes = [
        ...animal.likes.slice(0, likeIndex),
        ...animal.likes.slice(likeIndex + 1),
      ];
      setIsLiked(false);
      const updatedAnimal = { ...animal, likes: newLikes };
          setAnimals((prevAnimals) => {
            return prevAnimals.map((prevAnimal) => {
              if (prevAnimal.id === updatedAnimal.id) {
                return updatedAnimal;
              } else {
                return prevAnimal;
              }
            });
          });
      addLikes(updatedAnimal);
    }
    }
    
    function likesFunction() {
      return likes.length === 1 ? "Like" : "Likes";
    }
  
    async function addLikes(updatedAnimal) {
      try {
        const response = await fetch(`/animals/${updatedAnimal.id}/update_likes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.id }),
        });
    
        if (!response.ok) {
          throw new Error(`Request failed with status code ${response.status}`);
        }
    
        const data = await response.json();
        const { likes_count } = data;
    
        setAnimals((prevAnimals) => {
          return prevAnimals.map((prevAnimal) => {
            if (prevAnimal.id === updatedAnimal.id) {
              return { ...prevAnimal, likes: Array(likes_count).fill({ user_id: user.id }) };
            } else {
              return prevAnimal;
            }
          });
        });
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    }
  
  
    function showCom() {
      setshowComments((prev) => !prev);
    }
  
  
    const likeButtonStyle = {
      backgroundColor: isLiked ? "red" : "white",
      color: isLiked ? "white" : "red",
    };


  return (
    <div className="animalDiv">
      <img className="animalImg" src={image} alt={name} />
      <AnimalData>
        <AnimalName>{name}</AnimalName>
        <AnimalBreed> {breed}</AnimalBreed>
      </AnimalData>
      <AnimalHobbies><strong>{name}</strong> likes {hobbies}</AnimalHobbies>
      <LineDiv>
        <Line />
      </LineDiv>
      <LikeCommentShare>
        <div className="animalLikes" style={likeButtonStyle} onClick={handleClick}>
          <PawImg src={Paw} alt="paw" />
          {likes.length} {likesFunction()}
        </div>
        <button onClick={showCom} className="btn-comments">
          {comments && comments.length}{" "}
          {comments && comments.length === 1 ? "Comment" : "Comments"}
        </button>
        <ShareButton animal={animal} />
      </LikeCommentShare>
      <br />
      {showComments ? (
        <AddComment
          key={animal.image}
          setAnimals={setAnimals}
          animal={animal}
          setUser={setUser}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleClick={handleClick}
        />
      ) : null}
    </div>
  );
}
/*******************************
*   STYLED COMPONENTS          *
*******************************/

const AnimalName = styled.h2`
  padding-left: 20px;
  color: rgb(224, 110, 182);
`;

const AnimalBreed = styled.h4`
  font-size: 18px;
  padding-left: 20px;
  color: rgb(178, 173, 178);
`;

const LineDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Line = styled.p`
  border: 1px solid rgb(221, 217, 217);
  width: 400px;
  margin-bottom: 10px;
`;

const AnimalHobbies = styled.p`
  text-align: center;
`;

const LikeCommentShare = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  margin-top: 5px;
`;

const PawImg = styled.img 
`width:20px;
margin-right:3px;`

const AnimalData = styled.div `
display:flex;
align-items: center;
justify-content: space-between;
margin-right:30px;
margin-top:10px;
margin-bottom:10px;
`;