// controllers/postController.js
const postModel = require("../models/post-model");

// Create a new post
const createPost = async (req, res) => {
  const { title, content, imageUrl, author_id } = req.body;
  try {
    const postData = { title, content, imageUrl, author_id };
    const result = await postModel.createPost(postData);
    res
      .status(201)
      .json({ message: "Post created successfully", postId: result.insertId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.getPostById(id);
    if (!post.length) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch post", error: err.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;
  const postData = { title, content, imageUrl };
  try {
    const result = await postModel.updatePost(id, postData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: err.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postModel.deletePost(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
