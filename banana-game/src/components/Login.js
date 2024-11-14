import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(""); // Error message for login failure
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; 

  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setError("");
          localStorage.setItem("token", data.token); // Save token
          localStorage.setItem("username", formData.username); // Save username
          navigate("/home"); // Redirect to home page on successful login
        } else {
          setError(data.message || "Login failed.");
        }
      } catch (error) {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <p className="banana-title"> 🍌 Banana Game</p>
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
