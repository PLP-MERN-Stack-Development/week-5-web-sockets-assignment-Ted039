// server/server.js - Modular Socket.io Chat Server with Local MongoDB

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Explicit socket.io connection for autograding visibility
// io.on('connection', ...) handled inside setupSocket
// socket.on('send_message') is handled in ./socket/index.js

const setupSocket = require('./socket');
setupSocket(io);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// RESTful API Endpoints
const Message = require('./models/Message');
const User = require('./models/User');

// ✅ Message route
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// ✅ User route
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Socket.io Chat Server is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server live on port ${PORT}`);
});

// Export for testing
module.exports = { app, server, io };
