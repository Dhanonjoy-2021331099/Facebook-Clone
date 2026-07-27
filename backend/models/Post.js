const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      _id: {
        type: String,
        required: true,
      },

      fullName: {
        type: String,
        required: true,
      },

      username: {
        type: String,
        required: true,
      },

      dp: {
        type: String,
        default: "",
      },
    },

    caption: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    likes: {
      type: Number,
      default: 0,
    },

    comments: {
      type: Number,
      default: 0,
    },

    commentsData: {
      type: Array,
      default: [],
    },

    shares: {
      type: Number,
      default: 0,
    },

    sharesData: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);