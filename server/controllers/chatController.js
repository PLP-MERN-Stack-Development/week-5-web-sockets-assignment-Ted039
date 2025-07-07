// controllers/chatController.js
const Message = require('../models/Message');

async function handleMessage(io, socket, data, users) {
  const user = users[socket.id];
  const newMessage = new Message({
    senderId: socket.id,
    sender: user?.username || 'Anonymous',
    message: data.message,
  });

  await newMessage.save(); // persist to MongoDB
  io.emit('receive_message', newMessage);
}
