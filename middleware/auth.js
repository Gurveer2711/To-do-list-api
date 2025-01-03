const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser');
	
const auth = (req, res, next) => {
  const token = req.cookies.token; // Access the token from the cookie

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("req.user:", req.user);// Attach the decoded user info to the request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

module.exports = auth;
