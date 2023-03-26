import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./CommentAndReplies.css";
import { CableContext } from "./CableContext";
import ChatModal from "./ChatModal";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import createChatChannel from "../javascript/channels/chat_channel";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: "12px",
    border: "1px solid #dadde9",
  },
}));

export default function CommentAndReplyForm({
  handleCommentChange,
  handleCommentSubmit,
  animal,
  setAnimals,
  likeComment,
  likedComments,
  handleLikeComments,
  showCommentReplies,
  showReply,
  newReply,
  handleReplyChange,
  handleReplySubmit,
  newComment,
  handleCommentDelete,
  user_id,
  setUser,
  newMessage,
  setNewMessage,
}) {
  const { user } = useContext(UserContext);
  const userImage = localStorage.getItem("userImage");

  const [commentAuthors, setCommentAuthors] = useState({});
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleChatButtonClick = (author, shouldOpen, isSendButton, message) => {
    if (shouldOpen) {
      setSelectedAuthor(author);
      setShowChatModal({ show: true, position: "fixed" });
    } else if (!isSendButton) {
      setShowChatModal(false);
    }
    if (newMessage) {
      setNewMessage(null);
    } else if (message && !showChatModal.show) {
      setNewMessage(message);
    }
  };

  const handleCloseChatModal = () => {
    console.log("handleCloseChatModal called");
    setShowChatModal(false);
  };
  const { cable } = useContext(CableContext);

  useEffect(() => {
    if (cable && Object.keys(commentAuthors).length > 0) {
      const chatChannel = createChatChannel((data) => {
        if (data.user_id !== user.id) {
          handleChatButtonClick(
            {
              id: data.user_id,
              full_name: commentAuthors[data.user_id],
            },
            true
          );
        }
      }, user.id);

      return () => {
        cable.subscriptions.remove(chatChannel);
      };
    }
  }, [cable, user, commentAuthors]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const authors = {};
    users.forEach((user) => {
      authors[user.id] = user.full_name;
    });
    setCommentAuthors(authors);
  }, [users]);

  // Generate unique IDs for each comment
  const generateCommentId = (index) => `comment-${index}`;

  // Generate unique IDs for each comment like
  const generateCommentLikeId = (commentIndex) =>
    `comment-${commentIndex}-like`;
  const generateCommentReplyId = (commentIndex, replyIndex) =>
    `comment-${commentIndex}-reply-${replyIndex}`;

  function handleDelete(commentIndex) {
    handleCommentDelete(commentIndex);
  }

  function handleCommentAuthorClick(commentUserId) {
    setSelectedUser(commentUserId);
    setShow(true);
  }

  return (
    <form onSubmit={(event) => handleCommentSubmit(event, user)}>
      {/* Map over the comments in the `animal` object and render a `CommentsList` component for each comment */}
      {animal.comments &&
        animal.comments?.map((comment, commentIndex) => (
          <div key={generateCommentId(commentIndex)}>
            <div className="imgAuthor">
              <div
                className="comments-list"
                animal={animal}
                setAnimals={setAnimals}
              >
                <div
                  className="commentAuthor"
                  onClick={() => handleCommentAuthorClick(comment.user_id)}
                >
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Send a message to{" "}
                          {commentAuthors[comment.user_id] ||
                            `User ${comment.user_id}`}
                        </Typography>
                        <button
                          onClick={() => {
                            handleChatButtonClick(
                              {
                                id: comment.user_id,
                                full_name: commentAuthors[comment.user_id],
                              },
                              true,
                              true
                            );
                          }}
                        >
                          Chat
                        </button>
                      </React.Fragment>
                    }
                  >
                    <Button>
                              {/* <div className='author'>
                                {userImage && (<img className="commentator" src={userImage} alt="User"/>)}   
                                </div>  */}
                      {commentAuthors[comment.user_id] ||
                        `User ${comment.user_id}`}
                    </Button>
                  </HtmlTooltip>
                </div>
                <div className="userImgComment">{comment.comment}</div>
              </div>
            </div>
            {showChatModal && user && selectedAuthor && (
              <ChatModal
                currentUser={user && { id: user.id }}
                author={selectedAuthor && { id: selectedAuthor.id }}
                handleClose={handleCloseChatModal}
                position={showChatModal.position}
                handleChatButtonClick={handleChatButtonClick}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                show={showChatModal.show}
              />
            )}

            {/* {selectedUser && <UserDetails show={show} handleClose={handleClose} user_id={selectedUser} />} */}
            <LikeReply
              key={generateCommentLikeId(commentIndex)}
              onClick={() => handleLikeComments(commentIndex)}
            >
              {/* Display a heart icon depending on whether the comment has been liked */}
              <div className="likeBtn" >
              {likedComments.includes(commentIndex) ? "♥" : "♡"} Like
              </div>
            </LikeReply>
            <LikeReply onClick={(e) => showCommentReplies(commentIndex)}>
              ↳ Reply
            </LikeReply>
            <LikeReply onClick={(e) => handleDelete(commentIndex)}>
              {user_id === comment.user_id && <>&#9746; Delete</>}
            </LikeReply>
            <ul>
              {comment.replies &&
              Array.isArray(comment.replies) &&
              comment.replies.length > 0
                ? comment.replies.map((reply, replyIndex) => (
                    <Replies
                      key={generateCommentReplyId(commentIndex, replyIndex)}
                    >
                      {reply.reply}
                    </Replies>
                  ))
                : null}
            </ul>
            {/* If `showReply[commentIndex]` is truthy, render a form for submitting a reply to the comment */}
            {showReply[commentIndex] ? (
              <CommentForm>
                <TypeReply
                  type="text"
                  value={newReply}
                  onChange={handleReplyChange}
                  placeholder="Write a reply..."
                />
                <PostCommentBtn
                  className="replyBtn"
                  type="submit"
                  onClick={(e) => handleReplySubmit(e, commentIndex)}
                >
                  Reply
                </PostCommentBtn>
              </CommentForm>
            ) : null}
          </div>
        ))}

      {/* If `showComment` is truthy and there is text on the textarea, render the new comment */}
      {/* {showComment && newComment && <NewReplyLi key="new-comment">{newComment}</NewReplyLi>} */}
      <div className="comment-form">
        <textarea
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="type-comment"
        />
        <PostCommentBtn key="post-comment" type="submit">
          Post
        </PostCommentBtn>
      </div>
    </form>
  );
}

/*******************************
 *   STYLED COMPONENTS          *
 *******************************/

const LikeReply = styled.button`
  border: none;
  font-size: 12px;
  margin-left: 30px;
  margin-bottom: 10px;
  background-color: white;
  font-weight: 500;
`;

const Replies = styled.li`
  list-style: none;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  width: 350px;
  margin-left: 50px;
  background-color: rgb(242, 244, 246);
`;

const CommentForm = styled.div`
  display: flex;
  align-items: center;
`;

const PostCommentBtn = styled.button`
  width: 60px;
  height: 35px;
  background-color: rgb(104, 104, 201);
  color: white;
  border-radius: 5px;
  border: none;
  margin-bottom: 5px;
`;

const TypeReply = styled.textarea`
  margin-left: 100px;
  font-size: 12px;
  margin-right: 20px;
  height: 30px;
  width: 200px;
`;
