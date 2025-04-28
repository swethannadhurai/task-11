
// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // To enable cross-origin requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// API Routes
app.use('/api/auth', authRoutes);

// Default Route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

