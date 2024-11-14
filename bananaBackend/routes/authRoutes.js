const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware"); // Import the authentication middleware

const router = express.Router();

// Register and login routes (public)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Example of a protected route
router.get("/profile", authenticateToken, (req, res) => {
  // Here, `req.user` will contain the decoded token data (user ID)
  res.json({ message: "Welcome to your profile", userId: req.user.id });
});

module.exports = router;
