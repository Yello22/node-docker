const Post = require("../models/post.model");

async function getAllPosts(req, res, next) {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
}

async function getPost(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
}

async function createPost(req, res, next) {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
}

async function updatePost(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
}

async function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
