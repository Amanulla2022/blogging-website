const express = require("express");
const router = express.Router();
const authController = require("../controller/auth"); // Importing authentication controller

// Route for user signup // POST /api/signup
router.post("/signup", authController.signUp);

// Route for user login // POST /api/login
router.post("/login", authController.login);

module.exports = router; // Exporting the router
