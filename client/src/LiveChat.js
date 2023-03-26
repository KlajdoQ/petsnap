import React, { useState, useEffect, useRef } from 'react';
import createChatChannel from '../channels/chat_channel';

const LiveChat = ({ conversationId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatChannel = useRef(null);

  useEffect(() => {
    chatChannel.current = createChatChannel(conversationId, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      chatChannel.current.unsubscribe();
    };
  }, [conversationId]);

  const sendMessage = () => {
    chatChannel.current.sendMessage(newMessage, currentUser.id, conversationId);
    setNewMessage('');
  };

  return (
    <div className="live-chat">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user_id === currentUser.id ? 'own-message' : ''}`}>
            <div className="content">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default LiveChat;
