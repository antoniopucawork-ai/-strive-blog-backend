import express from "express";
import {
  getAllPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts);
PostRouter.get("/:id", getPostByID);
PostRouter.post("/", createPost);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", deletePost);

export default PostRouter;
