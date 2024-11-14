import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(''); // Error message for form validation or server issues
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, confirmPassword } = formData;

        // Basic client-side validation
        if (!username || !password || !confirmPassword) {
            setError("Please fill out all fields...");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            // Send data to backend for registration
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, confirmPassword })
            });

            const data = await response.json();

            if (response.ok) {
                setError("");
                navigate("/login"); // Redirect to login page upon successful registration
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
        }
    };
  

  return (
    <div className="register-container">
        <div className="logo-container">
        <p className="banana-title">Banana Game</p>
      </div>
      <form className="form-box" onSubmit={handleSubmit}>
      <div className="input-container"> 
        <h1>Register</h1>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate("/login")}>
          Back to Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
