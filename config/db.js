const mongoose = require("mongoose");

// Async function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/auth-db");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB connection Error", error);
  }
};

module.exports = connectDB; // Exporting the function to use it in other files
