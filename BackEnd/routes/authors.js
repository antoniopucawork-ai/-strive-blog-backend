import express from "express";

import {
  createAuthors,
  getAllAuthors,
  getAuthorbyID,
  upDateAuthor,
  deleteAuthor,
  updateAuthorAvatar,
} from "../controllers/authors.js";

import { upload } from "../middleware/cloudinary.js";

const Authorrouter = express.Router();

Authorrouter.get("/", getAllAuthors);
Authorrouter.post("/", createAuthors);
Authorrouter.get("/:id", getAuthorbyID);
Authorrouter.put("/:id", upDateAuthor);
Authorrouter.delete("/:id", deleteAuthor);

Authorrouter.patch(
  "/:authorId/avatar",
  upload.single("avatar"),
  updateAuthorAvatar,
);

export default Authorrouter;
