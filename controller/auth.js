const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/auth"); // Importing User model

const jwtSecret = "secretkey"; // Secret key for JWT

// Signup function
exports.signUp = async (req, res) => {
  const { email, password } = req.body; //Extracting email and password from request body

  try {
    // Checking if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user already exists, return a 400 status with a message
      return res.status(400).json({ message: "User already exists" });
    }
    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating a new user object with hashed password and saving it to the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    // Returning a success response with the user's email
    res.status(201).json({ email: newUser.email });
  } catch (error) {
    // Handling server errors and returning a 500 status with an error message
    res.status(500).json({ message: "Server error", error });
  }
};

// login function
exports.login = async (req, res) => {
  const { email, password } = req.body; // Extracting email and password from request body

  try {
    // Finding the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      // If user does not exist, return a 400 status with a message
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Comparing the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // If password is invalid, return a 400 status with a message
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generating JWT token
    const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    // Returning the JWT token in the response
    res.json({ token });
  } catch (error) {
    // Handling server errors and returning a 500 status with an error message
    res.status(500).json({ message: "Server error", error });
  }
};
