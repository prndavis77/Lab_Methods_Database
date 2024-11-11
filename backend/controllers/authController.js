const jwt = require("jsonwebtoken"); // Import JWT library
const { User } = require("../models"); // Import User model
require("dotenv").config(); // Load environment variables

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from the request body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" }); // Return error if user already exists
    }

    // Create new user if username is unique
    const user = await User.create({ username, password });
    res.status(201).json({ message: "User registered successfully" }); // Respond with success
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// Log in and generate JWT token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from the request body

    // Check if user exists
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" }); // Return error if credentials are invalid
    }

    // Generate JWT token if credentials are valid
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION, // Set token expiration from .env
      }
    );

    res.json({ token }); // Respond with the generated token
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};
