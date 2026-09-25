import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import Authorrouter from "./routes/authors.js";

const server = express();

server.use(express.json());
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connesso a MongoDB");
} catch (error) {
  console.error("Errore connessione MongoDB:", error);
}
server.get("/", (req, res) => {
  res.send("Ciao Antonio, il backend funziona!");
});
server.use("/authors", Authorrouter);

server.listen(process.env.PORT, () => {
  console.log("Server avviato sulla porta 9097");
});
