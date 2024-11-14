import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        const token = localStorage.getItem("token"); // Check if token is in localStorage

        if (token) {
            navigate("/game", { state: { startNewGame: true } }); // Redirect to the game if logged in
        } else {
            navigate("/login"); // Redirect to login if no token found
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <div
                    className="flex items-center justify-center min-h-screen p-4 bg-black w-full"

                >
                    <div className="flex flex-col text-white p-4 rounded-lg space-y-16 w-full">
                        <h1
                            className="text-5xl font-bold text-center my-4"
                            style={{
                                fontFamily: "cursive",
                                textDecoration: "none",
                            }}
                        >
                            Welcome ! {localStorage.getItem("username")}
                        </h1>

                        <div className="flex p-16 rounded-lg overflow-hidden bg-yellow-300 w-full max-w-xl mx-auto">
                            <button
                                type="submit"
                                className="w-full mb-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-[#011222] transition duration-300"
                                onClick={handleStartClick}
                            >
                                Start a Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;