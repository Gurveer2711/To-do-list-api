const jwt = require("jsonwebtoken");

// JWT middleware to verify the token
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header (Bearer <token>)
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  // If no token is provided, send an error response
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using your secret key (JWT_SECRET should be set in your environment)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data (e.g., user ID) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid or expired
    res.status(401).json({ message: "login again" });
  }
};

module.exports = verifyToken;
