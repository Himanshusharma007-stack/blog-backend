const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  return userController.registerUser(req, res);
});

router.post("/login", async (req, res) => {
  return userController.loginUser(req, res);
});

module.exports = router;
