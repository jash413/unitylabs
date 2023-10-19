const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  userType: String, // buyer or seller
});

module.exports = mongoose.model('User', userSchema);
