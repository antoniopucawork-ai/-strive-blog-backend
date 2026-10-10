import mongoose from "mongoose";

// Schema del singolo commento
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Schema del post
const postSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  readTime: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  // I commenti vengono salvati dentro il post
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
