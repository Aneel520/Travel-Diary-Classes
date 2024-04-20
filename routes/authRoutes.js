// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/users' , async(req,res) =>{
  try {
    const users = await User.find({}); // Exclude password field
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email , password)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Login failed' });
  }
});

module.exports = router;
