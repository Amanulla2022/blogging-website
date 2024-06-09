const Post = require("../model/post");
const jwt = require("jsonwebtoken");

const jwtSecret = "secretkey"; // this matches the secret key used in authController

// Middleware to verify JWT token verifytoken
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Extract token from request headers
  // console.log("Received Token:", token); // Log the received token

  // Check if token exists
  if (!token) return res.status(401).json({ message: "No token provided" });

  // Split token into parts
  const tokenParts = token.split(" ");
  // Checking token format
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Verify token
  jwt.verify(tokenParts[1], jwtSecret, (err, decoded) => {
    if (err) {
      // console.log("Token Verification Error:", err); // Log the error
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded; // Set the req.user object with decoded token data
    // console.log("Decoded Token:", decoded); // Log the decoded token
    next(); // Move to the next step
  });
};

// function for getting all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Find all posts and populate author's email and comments
    const posts = await Post.find()
      .populate({
        path: "comments",
        select: "content",
      })
      .populate("author", "email");
    // Return posts
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// function for creating a post
exports.createPost = async (req, res) => {
  const { title, content } = req.body; // Extract title and content from request body

  try {
    // Create a new post with title, content, and author's id
    const newPost = new Post({ title, content, author: req.user._id });
    await newPost.save(); // Save the new post
    // Return the new created post
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// function for getting a post by id
exports.getPostById = async (req, res) => {
  const { id } = req.params; // Extract post id from request parameters

  try {
    // Find post by id and populate author's email and comments
    const post = await Post.findById(id)
      .populate({
        path: "comments",
        select: "content",
      })
      .populate("author", "email");
    // Handle post not found
    if (!post) return res.status(404).json({ message: "Post not found" });
    // Return post
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// function for updating a post by id
exports.updatePost = async (req, res) => {
  const { id } = req.params; // Extract post id from request parameters
  const { title, content } = req.body; // Extract updated title and content from request body

  try {
    // Find post by id
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" }); // Handle post not found

    // Check if current user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Update post title and content
    post.title = title;
    post.content = content;
    await post.save(); // Save updated post
    res.json(post); // Return updated post
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// function for deleting a post by id
exports.deletePost = async (req, res) => {
  const { id } = req.params; // Extract post id from request parameters

  try {
    // Find post by id
    const post = await Post.findById(id);
    if (!post) {
      // console.log("Post not found with ID:", id); // Log if post is not found
      return res.status(404).json({ message: "Post not found" });
    }
    // console.log("Post found:", post); // Log the found post

    // Check if current user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      //  console.log("Unauthorized action by user:", req.user._id); // Log unauthorized action
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await Post.findByIdAndDelete(id); // Use findByIdAndDelete to Delete post
    console.log("Post deleted with ID:", id); // Log successful deletion
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error during post deletion:", error); // Log the error
    res.status(500).json({ message: "Server error", error });
  }
};
