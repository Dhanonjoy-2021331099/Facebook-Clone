const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const post = new Post({
      userId: "user123",
      content,
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
};