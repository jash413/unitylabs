const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import your User model
const secretKey = 'unitylabs'; // Replace with your actual secret key

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    // Verify the token and decode the user information
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user information to the request for use in other route handlers
    req.user = decoded;

    // Check if the user exists in the database (you may have different logic here)
    User.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized user' });
      }

      next(); // Continue to the next middleware or route handler
    });
  } catch (ex) {
    console.error(ex);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
