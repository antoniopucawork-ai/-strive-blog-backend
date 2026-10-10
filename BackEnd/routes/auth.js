import express from "express";
import { login, me } from "../controllers/auth.js";
import { authenticate } from "../middleware/authenticate.js";

const Authrouter = express.Router();

Authrouter.post("/login", login);

Authrouter.get("/me", authenticate, me);

export default Authrouter;
