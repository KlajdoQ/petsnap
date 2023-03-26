// components/Comments.js
import React, { useState } from 'react';
import ChatModal from './ChatModal';

const Comments = ({ currentUser, comments }) => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatAuthor, setChatAuthor] = useState(null);

  const handleSendMessage = (author) => {
    setChatAuthor(author);
    setShowChatModal(true);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

  const renderComments = () => {
    return comments.map((comment, index) => (
      <div key={index}>
        <p>{comment.content}</p>
        <button onClick={() => handleSendMessage(comment.author)}>Send Message</button>
      </div>
    ));
  };

  return (
    <div className="comments">
      {renderComments()}
      {showChatModal && (
        <ChatModal
          currentUser={currentUser}
          author={chatAuthor}
          handleClose={handleCloseChatModal}
        />
      )}
    </div>
  );
};

export default Comments;
