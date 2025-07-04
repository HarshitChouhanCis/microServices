const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(401).send({ message: 'Invalid credentials' });
  res.send({ message: 'Login successful' });
});

module.exports = router;