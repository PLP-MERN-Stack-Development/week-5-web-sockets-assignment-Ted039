// controllers/userController.js
const User = require('../models/User');

async function handleUserJoin(io, socket, username, users) {
  try {
    const user = new User({
      socketId: socket.id,
      username,
    });

    await user.save();
    users[socket.id] = user; // still store in memory for quick access

    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  } catch (err) {
    console.error('Error joining user:', err.message);
  }
}

async function handleDisconnect(io, socket, users, typingUsers) {
  const user = users[socket.id];

  if (user) {
    io.emit('user_left', { username: user.username, id: socket.id });

    try {
      await User.deleteOne({ socketId: socket.id });
    } catch (err) {
      console.error('Error removing user:', err.message);
    }

    console.log(`${user.username} left the chat`);
    delete users[socket.id];
  }

  delete typingUsers[socket.id];
  io.emit('user_list', Object.values(users));
  io.emit('typing_users', Object.values(typingUsers));
}

module.exports = { handleUserJoin, handleDisconnect };
