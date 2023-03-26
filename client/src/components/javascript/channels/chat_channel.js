import { createConsumer } from '@rails/actioncable';

const getWebSocketURL = () => {
  return 'ws://localhost:3000/cable';
};

const consumer = createConsumer(getWebSocketURL());

const sendMessage = (channel, content, user_id, receiver_id) => {
  channel.perform('send_message', { content, user_id, receiver_id });
};


const createChatChannel = (receivedMessageCallback, user_id, receiver_id) => {
  console.log('Creating chat channel');
  
  const channel = consumer.subscriptions.create(
    {
      channel: 'ChatChannel',
      user_id: user_id,
      receiver_id: receiver_id
    },
    {
      connected() {
        console.log('Connected to chat channel');
      },

      disconnected() {
        console.log('Disconnected from chat channel');
      },

      received(data) {
        console.log("Received data:", data);
        if (data.message && data.message.trim() !== "") {
          receivedMessageCallback({
            content: data.message.trim(),
            user_id: data.user_id,
            receiver_id: data.receiver_id,
          });
        } else {
          console.warn("Received empty message or message is not defined");
        }
      },
      

      send_message(content, user_id, receiver_id) {
        this.perform('send_message', { content, user_id, receiver_id });
      },
    }
  );

  return {
    sendMessage: (content, user_id, receiver_id) => channel.send_message(content, user_id, receiver_id),
    unsubscribe: () => consumer.subscriptions.remove(channel),

  };
};


export default createChatChannel;
