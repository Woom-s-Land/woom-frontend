import { Client } from '@stomp/stompjs';

const ChatBox = () => {
  const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
  });

  return (
    <div>
      <h1>채팅방</h1>
    </div>
  );
};

export default ChatBox;
