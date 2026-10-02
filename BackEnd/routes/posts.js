import express from "express";

import {
  getAllPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
  updatePostCover,
} from "../controllers/posts.js";

import { upload } from "../middleware/cloudinary.js";

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts);
PostRouter.get("/:id", getPostByID);
PostRouter.post("/", createPost);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", deletePost);

PostRouter.patch("/:blogPostId/cover", upload.single("cover"), updatePostCover);

export default PostRouter;
