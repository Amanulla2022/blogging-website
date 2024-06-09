const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Connecting collection (comments <-> users)
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts", // Connecting collection (comments <-> posts)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
