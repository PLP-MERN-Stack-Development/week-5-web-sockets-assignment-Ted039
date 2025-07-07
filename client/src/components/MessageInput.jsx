import { useContext, useState } from 'react';
import { SocketContext } from '../context/socketContext';

const MessageInput = () => {
  const [input, setInput] = useState('');
  const { sendMessage, setTyping } = useContext(SocketContext);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
      setTyping(false);
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setTyping(e.target.value.length > 0);
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
      />
    </div>
  );
};

export default MessageInput;
