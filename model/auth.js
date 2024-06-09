const { mongoose } = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating User model from the schema
const User = mongoose.model("users", userSchema);

module.exports = User; // Exporting the User model
