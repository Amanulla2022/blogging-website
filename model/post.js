const mongoose = require("mongoose");

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Connecting collection (posts <-> comments)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments", // Connecting collection (posts <-> users)
    },
  ],
});

// Creating Post model from the schema
const Post = mongoose.model("posts", postSchema);

module.exports = Post; // Exporting the Post model
