// models/postModel.js
const db = require("../config/db");

const createPost = async (postData) => {
  const { title, content, imageUrl, author_id } = postData;
  const query = `
    INSERT INTO posts (title, content, imageUrl, author_id)
    VALUES (?, ?, ?, ?)
  `;
  try {
    const [result] = await db.execute(query, [
      title,
      content,
      imageUrl,
      author_id,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error creating post: " + err.message);
  }
};
// models/postModel.js
const getAllPosts = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM posts");
    return rows;
  } catch (err) {
    throw new Error("Error fetching posts: " + err.message);
  }
};

// models/postModel.js
const getPostById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM posts WHERE id = ?", [id]);
    return rows;
  } catch (err) {
    throw new Error("Error fetching post by ID: " + err.message);
  }
};

// models/postModel.js
const updatePost = async (id, postData) => {
  const { title, content, imageUrl } = postData;
  const query = `
      UPDATE posts
      SET title = ?, content = ?, imageUrl = ?, updatedAt = NOW()
      WHERE id = ?
    `;
  try {
    const [result] = await db.execute(query, [title, content, imageUrl, id]);
    return result;
  } catch (err) {
    throw new Error("Error updating post: " + err.message);
  }
};

// models/postModel.js
const deletePost = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM posts WHERE id = ?", [id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting post: " + err.message);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
