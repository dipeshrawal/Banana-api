import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Handle input change for both username and password
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.username || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }
  
    try {
      // Log formData to verify the values
      console.log("Form Data:", formData);
  
      // Sending login data via POST request
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",  // Change to POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,  // Send username and password in the body
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        setError("");
        navigate("/game");  // Navigate to the dashboard on successful login
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <p className="banana-title">Banana Game</p>
      </div>
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="input-container"> 
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <button 
            type="button" 
            onClick={() => navigate("/register")}  // Navigate to Register page
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
