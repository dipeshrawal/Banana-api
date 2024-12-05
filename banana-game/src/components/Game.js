import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import backimage from './Assets/bananabackground.png';
import GameLogic from './GameLogic'; // Import GameLogic class

function Game() {
    const [number, setNumber] = useState(''); // User's input number
    const [gameData, setGameData] = useState(null); // Holds game data (image and solution)
    const [error, setError] = useState(null); // Holds any errors
    const [gameOver, setGameOver] = useState(false); // Flag to check if the game is over
    const [showResult, setShowResult] = useState(false); // Flag to display result
    const [loading, setLoading] = useState(false); // Flag for loading state
    const [isIncorrect, setIsIncorrect] = useState(false); // Flag for incorrect answer
    const [cooldown, setCooldown] = useState(0); // Cooldown timer

    const navigate = useNavigate();
    const location = useLocation();

    const gameLogic = React.useMemo(() => new GameLogic(), []); // Initialize GameLogic once

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login page if no token
        }
    }, [navigate]);

    useEffect(() => {
        // Start a new game if redirected with 'startNewGame'
        if (location.state?.startNewGame) {
            startGame();
        }
    }, [location.state]);

    // Start a new game
    const startGame = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/game/start');
            setGameData(response.data.data);
            setError(null);
            setGameOver(false);
            setShowResult(false);
            setIsIncorrect(false);
            setLoading(false);
        } catch (err) {
            setError('Error starting the game.');
            setLoading(false);
        }
    };

    // Decrease lives and handle cooldown
    const handleIncorrectAnswer = () => {
        gameLogic.decreaseLives();
        if (gameLogic.getLives() === 0) {
            setCooldown(gameLogic.getCooldownTimer());
            const interval = setInterval(() => {
                setCooldown((prev) => {
                    if (prev > 0) return prev - 1;
                    clearInterval(interval);
                    gameLogic.lives = 3; // Reset lives after cooldown
                    return 0;
                });
            }, 1000);
        }
    };

    // Check user's entered number
    const enter = async () => {
        if (!number) return setError('Please enter a number.');
    
        const selectedNumber = parseInt(number, 10);
        if (isNaN(selectedNumber) || selectedNumber < 0 || selectedNumber > 9) {
            setError('Please enter a valid number between 0 and 9.');
            return;
        }
    
        if (gameData) {
            const solution = gameData.solution;
    
            try {
                const userId = localStorage.getItem('username'); 
                if (!userId) {
                    setError('User not logged in.');
                    return;
                }
    
                if (selectedNumber === solution) {
                    // Send request to update gamesWon in the database
                    await axios.post('http://localhost:5000/api/game/guess', {
                        username: userId,
                    });
    
                    setGameOver(true);
                    setShowResult(true);
                    setError(null);
                    setIsIncorrect(false);
                } else {
                    setError(null);
                    setIsIncorrect(true);
                    handleIncorrectAnswer();
                    setGameOver(true);
                    setShowResult(true);
                }
            } catch (err) {
                setError('Error processing the guess.');
            }
        }
    
        setNumber('');
    };
    

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handlePlayAgain = () => {
        if (cooldown > 0) {
            setError('You are in cooldown period. Wait for it to end.');
            return;
        }
        setNumber('');
        setGameData(null);
        setGameOver(false);
        setShowResult(false);
        setIsIncorrect(false);
        startGame();
    };

    return (
        <div>
            {/* Navbar with lives and cooldown */}
            <Navbar lives={gameLogic.getLives()} cooldown={cooldown} />
            <div
                className="game-container min-h-screen flex justify-center items-center"
                style={{
                    backgroundImage: `url(${backimage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                }}
            >
                <div className="p-4 w-500 mt-6 bg-yellow-400 rounded-xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-4 text-white">Banana Game</h1>

                    {/* Game content */}
                    {gameData && (
                        <div className="game-content text-center">
                            <div className="image-container mb-4">
                                <img
                                    src={gameData.question}
                                    alt="Game Question"
                                    className="mx-auto mb-4 border-4 border-white rounded-lg shadow-lg"
                                />
                            </div>

                            {/* Show result */}
                            {showResult && gameOver ? (
                                isIncorrect ? (
                                    <div className="result mt-4 text-center">
                                        <h3 className="text-lg text-red-500 font-semibold">Oops!</h3>
                                        <p className="text-xl text-red-500">Wrong answer. Try again!</p>
                                    </div>
                                ) : (
                                    <div className="result mt-4 text-center">
                                        <h3 className="text-lg font-bold text-green-500">Awesome!!</h3>
                                        <p className="text-xl text-green-500 font-semibold">
                                            Correct answer! Well done!
                                        </p>
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
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 w-40 h-11 shadow-md"
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

                    {/* Play Again Button */}
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
        </div>
    );
}

export default Game;
