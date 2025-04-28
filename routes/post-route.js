// routes/postRoute.js
const express = require("express");
const postController = require("../controllers/post-controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", authenticateToken, postController.updatePost);
router.delete("/:id", authenticateToken, postController.deletePost);

module.exports = router;
