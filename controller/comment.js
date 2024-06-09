const Post = require("../model/post");
const Comment = require("../model/comment");

// function to create a comment
exports.createComment = async (req, res) => {
  const { content, postId } = req.body; // Extracting content and postId from request body

  try {
    // Find the post by its id
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Create a new comment with content, author's id, and post's id
    const newComment = new Comment({
      content,
      author: req.user._id,
      post: postId,
    });
    await newComment.save();

    // Add the comment's id to the post's comments array and save the post
    post.comments.push(newComment._id);
    await post.save();

    // Return the new created comment
    res.status(201).json(newComment);
  } catch (error) {
    // console.error("Error creating comment:", error); // Log the error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to get comments for a post
exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params; // Extracting postId from request parameters

  try {
    // Find the post by its id and populate its comments with author's email
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "author",
        select: "email",
      },
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Return the comments for the post
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to update a comment
exports.updateComment = async (req, res) => {
  const { id } = req.params; // Extracting comment id from request parameters
  const { content } = req.body; // Extracting updated content from request body

  try {
    // Find the comment by its id
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if the current user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Update the comment content and save it
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to delete a comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params; // Extracting comment id from request parameters

  try {
    // Find the comment by its id
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if the current user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Delete the comment and return success message
    await Comment.findByIdAndDelete(id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
