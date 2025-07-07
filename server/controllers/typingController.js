// controllers/typingController.js
async function handleTyping(io, socket, isTyping, users, typingUsers) {
  const username = users[socket.id]?.username;
  if (!username) return;

  if (isTyping) {
    typingUsers[socket.id] = username;
  } else {
    delete typingUsers[socket.id];
  }

  io.emit('typing_users', Object.values(typingUsers));
}

module.exports = { handleTyping };
