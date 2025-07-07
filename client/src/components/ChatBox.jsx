import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';

const ChatBox = () => {
  const { messages } = useContext(SocketContext);

  return (
    <div className="chat-box">
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.sender}:</strong> {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
