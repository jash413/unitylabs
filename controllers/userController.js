const User = require('../models/user');
const passport = require('../middleware/passport');
const jwt = require('jsonwebtoken');

// User registration
const registerUser = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password, userType });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};
 
// User login using Passport.js and issue a JWT token
const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If authentication is successful, create a JWT token
    const token = jwt.sign({ userId: user._id, userType: user.userType }, 'unitylabs',
      { expiresIn: '1d' });

    res.status(200).json({ token });
  })(req, res, next);
};

module.exports = {
  registerUser,
  loginUser,
};
