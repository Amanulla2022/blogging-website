const express = require("express");
const router = express.Router();
const postController = require("../controller/post"); // Importing post controller

// Route for get all posts // GET /posts
router.get("/", postController.getAllPosts);

// Route for creating a post // POST /posts
router.post("/", postController.verifyToken, postController.createPost);

// Route for getting a post // GET /posts/:id
router.get("/:id", postController.getPostById);

// Route for updating a post // PUT /posts/:id
router.put("/:id", postController.verifyToken, postController.updatePost);

// Route for deleting a post // DELETE /posts/:id
router.delete("/:id", postController.verifyToken, postController.deletePost);

module.exports = router; // Exporting the router
