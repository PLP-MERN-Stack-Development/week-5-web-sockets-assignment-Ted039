// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  socketId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  isTyping: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
