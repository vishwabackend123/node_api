const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      if (password != user.password) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;
