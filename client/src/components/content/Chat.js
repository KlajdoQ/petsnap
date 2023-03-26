import React, { useState, useEffect } from 'react';
import createChatChannel from '../javascript/channels/chat_channel';
import './ChatModal.css';

const ChatModal = ({ currentUser, author, handleClose }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatChannel, setChatChannel] = useState(null);

  // useEffect(() => {
  //   if (!conversation) {
  //     // Create or fetch the conversation between the current user and the author
  //     fetch('http://localhost:3000/conversations', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         conversation: {
  //           sender_id: currentUser.id,
  //           receiver_id: author.id,
  //         },
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setConversation(data);
  //         const channel = createChatChannel(data.id, handleReceivedMessage);
  //         setChatChannel(channel);
  //       });
  //   }
  // }, [conversation, currentUser, author]);
  const handleReceivedMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      chatChannel.sendMessage(inputValue, currentUser.id, conversation.id);
      setInputValue('');
    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className={message.user_id === currentUser.id ? 'currentUserMessage' : 'authorMessage'}>
        <p>{message.content}</p>
      </div>
    ));
  };
  const handleCloseChat = () => {
    
  };
  return (
    <>
      <section style={{ backgroundColor: '#eee' }} className="section">
        <div className="chatModal py-5">
          <div className="">
            <div className="">
              <div className="card">
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3"
                  style={{ borderTop: '4px solid #ffa900' }}
                >
                  <h5 className="mb-0">Messages</h5>
                  <button onClick={handleCloseChat}>Close</button>
                </div>
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: 'relative', height: '300px' }}
                >
                  {renderMessages()}
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type message"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn btn-warning"
                      type="button"
                      id="button-addon2"
                      style={{ paddingTop: '.55rem' }}
                      onClick={handleSendMessage}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatModal;