import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Game from "./components/Game";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboardpage" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
