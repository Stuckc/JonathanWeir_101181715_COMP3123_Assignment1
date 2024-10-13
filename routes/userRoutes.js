const express = require('express');
const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Optional, for JWT authentication
const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        email, // Make sure this matches the model
        password: hashedPassword,
      });
  
      // Save user to the database
      await newUser.save();
  
      res.status(201).json({
        message: 'User created successfully.',
        user_id: newUser._id,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Optional: Generate JWT
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful.',
            jwt_token: token, // Send JWT if implemented
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

  
module.exports = router;
