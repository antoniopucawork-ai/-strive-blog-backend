import mongoose from "mongoose";
import Author from "../models/Author.js";

export async function getAllAuthors(req, res) {
  try {
    const Allauthors = await Author.find();
    res.status(200).json(Allauthors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function createAuthors(req, res) {
  try {
    const { nome, cognome, email, dataDiNascita, avatar } = req.body;
    const author = new Author({ nome, cognome, email, dataDiNascita, avatar });
    const savedAuthor = await author.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAuthorbyID(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: "author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function upDateAuthor(req, res) {
  try {
    const { id } = req.params;
    const { nome, cognome, email, dataDiNascita, avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { nome, cognome, email, dataDiNascita, avatar },
      { returnDocument: "after" },
    );
    if (!updatedAuthor) {
      return res.status(404).json({ message: "author not found" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function deleteAuthor(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }

    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({ message: "author not found" });
    }

    res.status(200).json({ message: "author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
