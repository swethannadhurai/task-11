// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route for user registration
router.post('/register', authController.registerUser);

// Route for user login
router.post('/login', authController.loginUser);

// Route for getting user info (protected route)
router.get('/user', authMiddleware.verifyToken, authController.getUserInfo);

module.exports = router;



