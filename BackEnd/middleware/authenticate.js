import jwt from "jsonwebtoken";
import Author from "../models/Author.js";

export function authenticate(req, res, next) {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token non valido" });
  }
  const jwtToken = authheader.split(" ")[1];
  jwt.verify(jwtToken, process.env.JWT_SECRET, async function (error, payload) {
    if (error) {
      return res.status(401).json({ message: "token non valido" });
    }
    try {
      const { id } = payload;
      const author = await Author.findById(id);
      if (!author) {
        return res.status(401).json({ message: "autore non trovato" });
      }
      req.author = author;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
