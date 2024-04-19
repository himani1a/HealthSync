const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { sendVerificationEmail } = require('../utils/mail');
const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(20).toString('hex');
const appUrl = 'http://localhost:3000';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const verificationToken = generateToken();
  const newUser = new User({ email, password, verificationToken, isVerified: false });

  try {
    await newUser.save();
    const verificationUrl = `${appUrl}/verify-email?token=${verificationToken}&email=${email}`;
    sendVerificationEmail(email, verificationUrl);
    res.status(201).send('User registered. Please check your email to verify your account.');
  } catch (error) {
    res.status(500).send('Error registering new user.');
  }
});

router.get('/verify-email', async (req, res) => {
  const { token, email } = req.query;
  const user = await User.findOne({ email, verificationToken: token });

  if (!user) {
    return res.status(400).send('Invalid or expired token.');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  res.send('Email verified successfully!');
});

module.exports = router;
