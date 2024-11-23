const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Start a new game
router.get('/start', gameController.startGame);

router.post('/guess', gameController.guess);

// Get the game result
router.get('/result', gameController.getResult);


module.exports = router;
