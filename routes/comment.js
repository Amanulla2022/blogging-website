const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment");
const postController = require("../controller/post");

// Route for creating a comment // POST /comments
router.post("/", postController.verifyToken, commentController.createComment);

// Route for updating a comment // PUT /comments/:id
router.put("/:id", postController.verifyToken, commentController.updateComment);

// Route for deleting a comment // DELETE /comments/:id
router.delete(
  "/:id",
  postController.verifyToken,
  commentController.deleteComment
);

// Route for getting a comment by postid // GET /comments/:postId
router.get("/:postId", commentController.getCommentsByPostId);

module.exports = router; // Exporting the router
