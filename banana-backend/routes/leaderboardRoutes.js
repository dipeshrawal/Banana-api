// routes/leaderboardRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure you have this model

// Route to get the leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await User.find()  // Get all users
      .sort({ gamesWon: -1 })  // Sort by gamesWon in descending order
      .limit(10)  // Limit to top 10 users
      .select("username gamesWon");  // Only fetch username and gamesWon fields
    
    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ message: "Error fetching leaderboard data" });
  }
});

module.exports = router;
