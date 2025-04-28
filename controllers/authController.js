const User = require('../models/user');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// User login and JWT generation
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get user information (protected route)
exports.getUserInfo = (req, res) => {
  res.send({ user: req.user });
};
