const express = require("express");
const router = express.Router();
const authController = require("../controller/auth"); // Importing authentication controller

// Route for user signup
router.post("/signup", authController.signUp);

// Route for user login
router.post("/login", authController.login);

module.exports = router; // Exporting the router
