import express from "express";
import {
  createAuthors,
  getAllAuthors,
  getAuthorbyID,
  upDateAuthor,
  deleteAuthor,
} from "../controllers/authors.js";
const Authorrouter = express.Router();
Authorrouter.get("/", getAllAuthors);
Authorrouter.post("/", createAuthors);
Authorrouter.get("/:id", getAuthorbyID);
Authorrouter.put("/:id", upDateAuthor);
Authorrouter.delete("/:id", deleteAuthor);
export default Authorrouter;
