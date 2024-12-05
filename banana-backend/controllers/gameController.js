const axios = require('axios');
const User = require('../models/User'); // Import the User model

// Helper function to fetch game data from the API
const fetchGameData = async () => {
  try {
    const response = await axios.get("http://marcconrad.com/uob/banana/api.php");
    return response.data;
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

// Start a new game
exports.startGame = async (req, res) => {
  try {
    console.log("Starting new game...");
    const data = await fetchGameData(); // Reusable API call
    console.log("Game started successfully:", data);  // Log the response
    res.status(200).json({ message: 'New game started', data });
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ error: 'Error starting game', details: error.message });
  }
};

// Make a guess
exports.guess = async (req, res) => {
  const {username } = req.body;
   // Ensure you're passing the userId and number
   if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
}

try {
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    user.gamesWon = (user.gamesWon || 0) + 1; // Increment gamesWon
    await user.save(); 

    res.status(200).json({ message: 'Games won updated successfully.' });
} catch (err) {
    res.status(500).json({ error: 'Failed to update games won.' });
}
};


// Get the game result
exports.getResult = async (req, res) => {
  try {
    console.log("Fetching game result...");
    const data = await fetchGameData(); // Reusable API call for result
    console.log("Game result fetched successfully:", data);
    res.status(200).json({ message: 'Game result', data });
  } catch (error) {
    console.error('Error getting result:', error);
    res.status(500).json({ error: 'Error getting result', details: error.message });
  }
};
