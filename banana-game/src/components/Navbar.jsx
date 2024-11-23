import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Using Font Awesome for heart icons

const Navbar = ({ lives, cooldown }) => {
    const navigate = useNavigate();

    // Check if the user is logged in by checking the presence of a token
    const token = localStorage.getItem("token");

    // Handle logout by removing token from localStorage and redirecting to home/login page
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username"); // Remove username as well
        navigate("/"); // Redirect to home or login page after logging out
    };

    return (
        <div className="flex justify-between items-center bg-slate-500 w-full p-3 fixed top-0">
            <Link to="/home" className="text-2xl text-white font-bold text-center">🍌 Banana Game</Link>

            <div className="flex items-center gap-4">
                {/* Display Lives */}
                <div className="flex items-center text-white">
                    {Array.from({ length: 3 }, (_, i) => (
                        <FaHeart 
                            key={i} 
                            className={`mx-1 ${i < lives ? 'text-red-500' : 'text-gray-400'}`} 
                        />
                    ))}
                </div>

                {/* Display Cooldown Timer */}
                {cooldown > 0 && (
                    <div className="text-white bg-yellow-400 px-3 py-1 rounded-md">
                        Countdown: {cooldown}s
                    </div>
                )}

                {/* Logout Button */}
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
