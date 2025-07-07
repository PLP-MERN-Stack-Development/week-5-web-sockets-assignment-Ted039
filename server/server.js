// server.js - Socket.io Chat Server with MongoDB & Modular Socket Setup

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config();

// MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io setup
const setupSocket = require('./socket');
setupSocket(io); // ← modular, controller-driven logic

// RESTful API Endpoints
const Message = require('./models/Message');
const User = require('./models/User');

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    res.json(messages.reverse()); // show in chronological order
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v'); // exclude version field
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

module.exports = { app, server, io };
