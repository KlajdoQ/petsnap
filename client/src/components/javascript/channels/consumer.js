import { createConsumer } from '@rails/actioncable';

const getWebSocketURL = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
  const host = window.location.host;
  return `${protocol}${host}/cable`;
};

export default createConsumer(getWebSocketURL());