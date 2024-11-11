const jwt = require("jsonwebtoken"); // Import JWT library
require("dotenv").config(); // Load environment variables

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." }); // If no token, deny access
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret key
    req.user = decoded; // Store the decoded token payload (user data) in req.user
    next(); // Move to the next middleware or route handler
  } catch (ex) {
    res.status(400).json({ error: "Invalid or expired token." }); // If verification fails, return error
  }
};

module.exports = authMiddleware;
