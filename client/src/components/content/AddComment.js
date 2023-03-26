import React, { useState } from "react";
import CommentAndReplyForm from "./CommentAndReplyForm";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function AddComment({ newMessage, setNewMessage, animal, setAnimals , setUser, handleClick}) {

  const [newComment, setnewComment] = useState("");
  const [showComment, setshowComment] = useState(false);
  const [likeComment, setLikeComment] = useState(false);
  const [showReply, setShowReply] = useState(animal.comments ? Array(animal.comments.length).fill(false) : []);
  const [newReply, setNewReply] = useState(animal.comments ? Array(animal.comments.length).fill("") : []);
  const { user} = useContext(UserContext)
  const [likedComments, setLikedComments] = useState([]);

  
  function handleCommentSubmit(event) {
    event.preventDefault();
    if (newComment) {
      const requestBody = { comment: { comment: newComment, user_id: user.id } };
      fetch(`http://localhost:3000/animals/${animal.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((newComment) => {
          setAnimals((prevAnimals) =>
            prevAnimals.map((currentAnimal) => {
              if (currentAnimal.id === animal.id) {
                return {
                  ...currentAnimal,
                  comments: [...(currentAnimal.comments || []), newComment],
                };
              } else {
                return currentAnimal;
              }
            })
          );
          setnewComment("");
          setshowComment(true);
        })
        .catch((error) => console.error(error));
    }
  }
  

  function handleCommentChange(event) {
    setnewComment(event.target.value);
  }


  
  // function to show the comments when the comment is clicked
  function showCommentReplies(commentIndex) {
    setShowReply((prev) => {
      let isCommentShown = { ...prev };
      isCommentShown[commentIndex] = !isCommentShown[commentIndex];
      return isCommentShown;
    });
  }

  function handleLikeComments(commentIndex) {
    if (likedComments.includes(commentIndex)) {
      setLikedComments(likedComments.filter((index) => index !== commentIndex));
    } else {
      setLikedComments([...likedComments, commentIndex]);
    }
  }
  
  //function to assign the state change to the reply
  function handleReplyChange(e) {
    setNewReply(e.target.value);
  }

  // update the reply state in the parent component with a new reply and also update the backend
  function handleReplySubmit(e, commentIndex) {
    e.preventDefault();
    if (newReply) {
      fetch(`http://localhost:3000/animals/${animal.id}/comments/${animal.comments[commentIndex].id}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ 
          reply: { reply: newReply } 
        }),
      })
        .then((response) => response.json())
        .then((newReply) => {
          setAnimals((prevAnimals) =>
            prevAnimals.map((currentAnimal) => {
              if (currentAnimal.id === animal.id) {
                return {
                  ...currentAnimal,
                  comments: currentAnimal.comments.map((currentComment, i) =>
                    i === commentIndex ? { ...currentComment, replies: [...currentComment.replies, newReply] } : currentComment
                  ),
                };
              } else {
                return currentAnimal;
              }
            })
          );
          setNewReply("");
          setShowReply((prev) => {
            let isCommentShown = { ...prev };
            isCommentShown[commentIndex] = false;
            return isCommentShown;
          });
        })
        .catch((error) => console.error(error));
    }
  }
  
  function handleCommentDelete(commentIndex) {
    const commentId = animal.comments[commentIndex].id;
    fetch(`http://localhost:3000/animals/${animal.id}/comments/${commentId}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        setAnimals((prevAnimals) =>
          prevAnimals.map((currentAnimal) => {
            if (currentAnimal.id === animal.id) {
              return {
                ...currentAnimal,
                comments: currentAnimal.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              };
            } else {
              return currentAnimal;
            }
          })
        );
      })
      .catch((error) => console.error(error));
  }
  
  return (
    <CommentAndReplyForm
      handleCommentSubmit={handleCommentSubmit}
      animal={animal}
      setAnimals={setAnimals}
      likeComment={likeComment}
      likedComments={likedComments}
      handleLikeComments={handleLikeComments}
      showCommentReplies={showCommentReplies}
      showReply={showReply}
      newReply={newReply}
      handleReplyChange={handleReplyChange}
      handleCommentChange={handleCommentChange}
      handleReplySubmit={handleReplySubmit}
      showComment={showComment}
      handleCommentDelete={handleCommentDelete}
      user_id={user.id}
      setUser={setUser}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      handleClick={handleClick}
    />
  );
}
