// User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  gamesWon: { type: Number, default: 0},
});

const User = mongoose.model("User", userSchema);
module.exports = User; 