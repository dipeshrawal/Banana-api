const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/databaseConnection");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());              // Enable CORS
app.use(express.json());       // Parse JSON bodies

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/game", require("./routes/gameRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
