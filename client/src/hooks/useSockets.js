import { useEffect, useState } from 'react';
import socket from '../socket/socket';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  const connect = (username) => {
    socket.connect();
    socket.emit('user_join', username);
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const sendMessage = (message) => {
    socket.emit('send_message', { message });
  };

  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('receive_message', (msg) => setMessages((prev) => [...prev, msg]));
    socket.on('user_list', setUsers);
    socket.on('typing_users', setTypingUsers);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive_message');
      socket.off('user_list');
      socket.off('typing_users');
    };
  }, []);

  return { socket, isConnected, messages, users, typingUsers, connect, disconnect, sendMessage, setTyping };
};
