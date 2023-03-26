import React, { createContext, useState, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

const CableContext = createContext();

const CableProvider = ({ children }) => {
  const [cable, setCable] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const handleReceivedMessage = (message) => {
    setReceivedMessage(message);
  };
  
  useEffect(() => {
    const cableConsumer = createConsumer('ws://localhost:3000/cable');
    setCable(cableConsumer);

    return () => cableConsumer.disconnect();
  }, []);

  return (
    <CableContext.Provider value={{ cable, receivedMessage, handleReceivedMessage }}>
      {children}
    </CableContext.Provider>
  )
}

export { CableContext, CableProvider };

