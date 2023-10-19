const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/api/auth/register', userController.registerUser);

// Login as a user and receive a JWT token
router.post('/api/auth/login', userController.loginUser);

module.exports = router;
