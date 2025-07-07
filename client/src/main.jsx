import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketProvider } from './context/socketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
