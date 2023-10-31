const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, createPost);
router
  .route("/:id")
  .get(protect, getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
