import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, confirmPassword } = formData;
  
    if (!name || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, confirmPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setError("");
        navigate("/login");
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
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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
      </form>
    </div>
  );
};

export default Register;
