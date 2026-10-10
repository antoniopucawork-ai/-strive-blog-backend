import express from "express";

import {
  getAllPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
  updatePostCover,
  getPostComments,
  getPostCommentById,
  createPostComment,
  updatePostComment,
  deletePostComment,
} from "../controllers/posts.js";

import { upload } from "../middleware/cloudinary.js";

const PostRouter = express.Router();

// CRUD POSTS
PostRouter.get("/", getAllPosts);
PostRouter.get("/:id", getPostByID);
PostRouter.post("/", createPost);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", deletePost);

// COVER
PostRouter.patch("/:blogPostId/cover", upload.single("cover"), updatePostCover);

// COMMENTS

// Tutti i commenti di un post
PostRouter.get("/:id/comments", getPostComments);

// Singolo commento
PostRouter.get("/:id/comments/:commentId", getPostCommentById);

// Crea un nuovo commento
PostRouter.post("/:id", createPostComment);

// Modifica un commento
PostRouter.put("/:id/comment/:commentId", updatePostComment);

// Elimina un commento
PostRouter.delete("/:id/comment/:commentId", deletePostComment);

export default PostRouter;
