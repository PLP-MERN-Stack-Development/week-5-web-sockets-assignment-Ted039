// socket/index.js
const { handleUserJoin, handleDisconnect } = require('../controllers/userController');
const { handleMessage, handlePrivateMessage } = require('../controllers/chatController');
const { handleTyping } = require('../controllers/typingController');

/**
 * Sets up Socket.io server handlers.
 * @param {Server} io - socket.io server instance
 */
function setupSocket(io) {
  const users = {};
  const typingUsers = {};

  io.on('connection', (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);

    // Listen for user joining
    socket.on('user_join', (username) => {
      handleUserJoin(io, socket, username, users);
    });

    // Handle public chat messages
    socket.on('send_message', (data) => {
      handleMessage(io, socket, data, users);
    });

    // Handle private messages
    socket.on('private_message', (payload) => {
      handlePrivateMessage(io, socket, payload, users);
    });

    // Handle typing indicators
    socket.on('typing', (isTyping) => {
      handleTyping(io, socket, isTyping, users, typingUsers);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      handleDisconnect(io, socket, users, typingUsers);
    });
  });
}

module.exports = setupSocket;
