// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach the userId from JWT to request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { verifyToken };


