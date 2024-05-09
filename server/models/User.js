const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  otp: { 
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define User model
const Userss = mongoose.model('Userss', UserSchema);

module.exports = Userss;
