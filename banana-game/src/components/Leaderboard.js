import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import backimage from './Assets/bananabackground.png';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setLeaderboard(response.data); // Store leaderboard data
      } catch (err) {
        setError('Unable to fetch leaderboard data. Please try again later.');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <div
        className="leaderboard-page min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${backimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        <div className="leaderboard-content p-8 bg-yellow-300 rounded-lg shadow-2xl max-w-4xl w-full">
          <h1
            className="text-4xl font-bold text-center text-yellow-600 mb-6"
            style={{
              fontFamily: 'cursive',
              textDecoration: 'none',
            }}
          >
            Leaderboard
          </h1>

          {error ? (
            <div className="error-message text-center text-red-500">{error}</div>
          ) : leaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-400 text-center">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-2 px-4 border border-gray-400">Rank</th>
                    <th className="py-2 px-4 border border-gray-400">Username</th>
                    <th className="py-2 px-4 border border-gray-400">Games Won</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr
                      key={user._id}
                      className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}
                    >
                      <td className="py-2 px-4 border border-gray-400">{index + 1}</td>
                      <td className="py-2 px-4 border border-gray-400">{user.username}</td>
                      <td className="py-2 px-4 border border-gray-400">{user.gamesWon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-700">Loading leaderboard...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
