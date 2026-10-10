import mongoose from "mongoose";
import Author from "../models/Author.js";
import bcrypt from "bcrypt";
export async function getAllAuthors(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const Allauthors = await Author.find().skip(skip).limit(limit);

    res.status(200).json(Allauthors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createAuthors(req, res) {
  try {
    const { nome, cognome, email, password, dataDiNascita, avatar } = req.body;

   /* const hashedPassword = await bcrypt.hash(password, 10);*/

    const author = new Author({
      nome,
      cognome,
      email,
      password, 
     /* password: hashedPassword,*/
      dataDiNascita,
      avatar,
    });

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
    const { nome, cognome, email, password, dataDiNascita, avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }

    const updateData = {
      nome,
      cognome,
      email,
      dataDiNascita,
      avatar,
    };

    // Se viene inviata una nuova password,
    // la hashiamo prima di aggiornarla
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAuthor = await Author.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

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

export async function updateAuthorAvatar(req, res) {
  try {
    const { authorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "invalid id" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "image not found" });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { avatar: req.file.path },
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
