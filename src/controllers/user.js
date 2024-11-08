const UserSchema = require("../models/user");
const { generateToken } = require("../utils/jwtUtility");

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists." });

    // Create new user
    const user = new UserSchema({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    let userObj = {
      _id: user.id, username: user.username, email: user.email
    }

    res.status(201).json({ msg: "User registered successfully", token, user: userObj });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials." });

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // Generate JWT token
    const token = generateToken(user._id);
    let userObj = {
      _id: user.id, username: user.username, email: user.email
    }

    res.status(200).json({ msg: "Login successful", token, user: userObj });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
