const mongoose = require("mongoose");
const Post = require("../models/Post");

let memoryPosts = [];

const preferredUser = {
  _id: "user123",
  fullName: "Jibon Roy",
  username: "jibon",
  dp: "https://random.imagecdn.app/200/200",
};

const normalizeUser = (user = {}) => {
  if (
    user.fullName === "Saiful Islam Shihab" ||
    user.fullName === "Saiful Islam Shihan"
  ) {
    return {
      ...user,
      fullName: preferredUser.fullName,
      username: preferredUser.username,
      dp: preferredUser.dp,
    };
  }

  return user;
};

const normalizeCommentTree = (comments = []) =>
  comments.map((comment) => ({
    ...comment,
    user: normalizeUser(comment.user),
    replies: comment.replies
      ? normalizeCommentTree(comment.replies)
      : comment.replies,
  }));

const normalizePost = (post) => ({
  ...post,
  user: normalizeUser(post.user),
  commentsData: normalizeCommentTree(post.commentsData || []),
});

const buildPostPayload = (caption, image, user) => ({
  user: normalizeUser(user) || preferredUser,
  caption,
  image: image || "",
  likes: 0,
  comments: 0,
  commentsData: [],
  shares: 0,
  sharesData: [],
});

const createPost = async (req, res) => {
  try {
    const { caption, image, user } = req.body;

    if (mongoose.connection.readyState === 1) {
      const post = new Post(buildPostPayload(caption, image, user));
      const savedPost = await post.save();
      return res.status(201).json(normalizePost(savedPost.toObject()));
    }

    const fallbackPost = {
      ...buildPostPayload(caption, image, user),
      _id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryPosts.unshift(fallbackPost);
    return res.status(201).json(fallbackPost);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res
        .status(200)
        .json(posts.map((post) => normalizePost(post.toObject())));
    }

    return res.status(200).json(memoryPosts.map(normalizePost));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
};
