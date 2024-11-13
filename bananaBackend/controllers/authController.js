const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  if (!name || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error in loginUser:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
