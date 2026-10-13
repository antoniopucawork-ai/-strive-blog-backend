import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import Authorrouter from "./routes/authors.js";
import PostRouter from "./routes/posts.js";
import { logger } from "./middleware/logger.js";
import Authrouter from "./routes/auth.js";
import { authenticate } from "./middleware/authenticate.js";
import passport from "passport";
import googleStrategy from "./Strategies/google.js";

const server = express();
server.use(logger);
passport.use(googleStrategy);
server.use(express.json());
server.use(cors());
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connesso a MongoDB");
} catch (error) {
  console.error("Errore connessione MongoDB:", error);
}
server.get("/", (req, res) => {
  res.send("Ciao Antonio, il backend funziona!");
});
server.use("/auth", Authrouter);
server.use(authenticate);
server.use("/authors", Authorrouter);
server.use("/blogPosts", PostRouter);

server.listen(process.env.PORT, () => {
  console.log("Server avviato sulla porta 9097");
});
