const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register router
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exits with this email" });
    }
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).json({message : `${newUser.name} registered`});
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//login router
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d",});
    res.cookie("token", token);
    res.status(200).json({message: "Login Successful",token});
  } catch (error) { 
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
