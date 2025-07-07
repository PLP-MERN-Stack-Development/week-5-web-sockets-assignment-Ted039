import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socketContext';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';

const ChatPage = () => {
  const { connect } = useContext(SocketContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (username) connect(username);
  }, [username]);

  return (
    <div>
      {!username ? (
        <input
          placeholder="Enter your username"
          onKeyDown={(e) => {
            if (e.key === 'Enter') setUsername(e.target.value);
          }}
        />
      ) : (
        <div className="chat-layout">
          <UserList />
          <ChatBox />
          <MessageInput />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
