import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import backimage from './Assets/bananabackground.png'

function Game() {
  const [number, setNumber] = useState(''); // User's input number
  const [gameData, setGameData] = useState(null); // Holds game data (image and solution)
  const [error, setError] = useState(null); // Holds any errors
  const [gameOver, setGameOver] = useState(false); // Flag to check if the game is over
  const [answerChecked, setAnswerChecked] = useState(false); // Flag to check if answer is checked
  const [showResult, setShowResult] = useState(false); // Flag to display result after checking the answer
  const [loading, setLoading] = useState(false); // Flag for loading state when starting a game
  const [isIncorrect, setIsIncorrect] = useState(false); //Flag for the incorrect answer
  const location = useLocation(); // Get location to detect if redirected with 'startNewGame'
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if no token is found
    }
  }, [navigate]);


  // Start a new game
  const startGame = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/game/start');
      console.log('Game started:', response.data);
      setGameData(response.data.data); // Set the game data from the response
      setError(null);
      setGameOver(false); // Reset the game over flag when starting a new game
      setAnswerChecked(false); // Reset answer checked flag
      setShowResult(false); // Hide the result until user enters a number
      setLoading(false);
    } catch (err) {
      setError('Error starting the game.');
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.startNewGame) {
      startGame();
    }
  }, [location.state]);

  // Make a move and check if the solution is correct
  const enter = async () => {
    if (!number) return setError('Please enter a number.');

    const selectedNumber = parseInt(number, 10);
    if (isNaN(selectedNumber) || selectedNumber < 0 || selectedNumber > 9) {
      setError('Please enter a valid number between 0 and 9.');
      return;
    }

    // Ensure that the gameData is available and that the solution is correct
    if (gameData) {
      const solution = gameData.solution;
      console.log(`Checking: ${selectedNumber} vs ${solution}`);

      if (selectedNumber === solution) {
        setGameOver(true); // Set game over if the solution is correct
        setAnswerChecked(true); // Mark the answer as checked
        setShowResult(true); // Show result after checking
        setError(null); // Clear any previous error
        setIsIncorrect(false); // Clear incorrect flag on correct answer
      } else {
        setError(null);
        setIsIncorrect(selectedNumber); // Set `isIncorrect` to entered number
        setGameOver(true);
        setShowResult(true); // Show result after checking
      }
    }
    setNumber(''); // Clear the input after each attempt
  };

  // Handle number input change
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  // Handle "Play Again" button click
  const handlePlayAgain = () => {
    setNumber('');
    setGameData(null); // Reset game data when playing again
    setGameOver(false); // Reset game over state
    setAnswerChecked(false); // Reset answer checked flag
    setShowResult(false); // Hide the result until a new game starts
    setIsIncorrect(false); // Clear the incorrect message
    startGame(); // Start a new game
  };

  return (
    <div className='flex justify-center item-center' style={{backgroundImage:`url(${backimage})`, backgroundSize: 'fit', backgroundPosition: 'centre'}}>
  
      <div className=" p-4 w-500 mt-6 bg-yellow-400 rounded-xl shadow-2xl" >
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Banana Game</h1>

        {/* Display Game Image, Result Message, and Input */}
        {gameData && (
          <div className="game-content text-center">
            <div className="image-container mb-4">
              <img src={gameData.question} alt="Game Question" className="mx-auto mb-4 border-4 border-white rounded-lg shadow-lg" />
            </div>

            {/* Display message and result */}
            {showResult && gameOver ? (
              isIncorrect ? (
                <div className="result mt-4 text-center">
                  <h3 className="text-lg font-semibold">Game State</h3>
                  <p className="text-xl text-red-500">Oops! {isIncorrect} is not a correct number. Try again!</p>
                </div>
              ) : (
                <div className="result mt-4 text-center">
                  <h3 className="text-lg font-semibold">Game State</h3>
                  <p className="text-xl text-green-500 font-bold">Correct answer! Well done!</p>
                </div>
              )
            ) : (
              <div className="move flex justify-center space-x-4 mb-4">
                <input
                  type="number"
                  placeholder="Enter a number"
                  value={number}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-2 rounded w-40 text-center"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2  w-40 h-11 shadow-md"
                  onClick={enter}
                >
                  Enter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Error Handling */}
        {error && <p className="error text-red-500 text-center">{error}</p>}

        {/* Play Again Button below the image */}
        {gameOver && (
          <div className="mt-4 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full w-full shadow-lg"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
