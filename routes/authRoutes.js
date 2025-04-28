const express = require('express');
const { register, login, getUserInfo } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login and get JWT token
router.post('/login', login);

// Get user info (protected route)
router.get('/user', authMiddleware, getUserInfo);

module.exports = router;

