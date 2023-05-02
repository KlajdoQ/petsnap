import React, { createContext, useState, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

// Create a new context for Action Cable
const CableContext = createContext();

// Create a provider component for the CableContext
const CableProvider = ({ children }) => {
  const [cable, setCable] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const handleReceivedMessage = (message) => {
    setReceivedMessage(message);
  };
  
  // Create a new consumer when the component mounts
  useEffect(() => {
    const cableConsumer = createConsumer('ws://localhost:3000/cable');
    // Update the state with the new consumer
    setCable(cableConsumer);

    // Return a function to disconnect the consumer when the component unmounts
    return () => cableConsumer.disconnect();
  }, []);

  // Render the CableContext.Provider and pass in the state and handleReceivedMessage function as the value
  return (
    <CableContext.Provider value={{ cable, receivedMessage, handleReceivedMessage }}>
      {children}
    </CableContext.Provider>
  )
}

// Export the CableContext and CableProvider for use in other components
export { CableContext, CableProvider };

