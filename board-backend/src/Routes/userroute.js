// routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller.js');

// POST /register - User Registration
router.post('/register', async (req, res) => {
  const { name,email, password } = req.body;
  try {
    const user = await userController.register(name, email,password);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });

  }
});

// POST /login - User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userController.login(email, password);
      res.json(user);
    } catch (error) {
      res.json({ message: 'Login failed', error: error.message });
    }
  });

module.exports = router;
