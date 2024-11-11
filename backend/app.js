const express = require("express");
const cors = require("cors");
const methodsRoutes = require("./routes/methodsRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Configure CORS to allow requests from the frontend
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both origins
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Use auth routes
app.use("/auth", authRoutes); // Unprotected routes for authentication

// Use methods routes with authentication middleware
app.use("/methods", methodsRoutes); // Protected routes for methods

// Handle 404 errors for unsupported routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler for any other errors
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
