import mongoose from "mongoose";
import Author from "../models/Author.js";
import bcrypt from "bcrypt";

// GET - Recupera tutti gli autori con paginazione
export async function getAllAuthors(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

    const skip = (page - 1) * limit;

    const allAuthors = await Author.find().skip(skip).limit(limit);

    res.status(200).json(allAuthors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST - Crea un nuovo autore
export async function createAuthors(req, res) {
  try {
    const { nome, cognome, email, password, dataDiNascita, avatar } = req.body;

    // Verifica che la password sia presente
    if (typeof password !== "string" || !password.trim()) {
      return res.status(400).json({
        message: "Password obbligatoria",
      });
    }

    // Controlla se l'email è già registrata
    const existingAuthor = await Author.findOne({ email });

    if (existingAuthor) {
      return res.status(409).json({
        message: "Email già registrata",
      });
    }

    // Crea l'autore
    const author = new Author({
      nome,
      cognome,
      email,
      password,
      dataDiNascita,
      avatar,
    });

    // Il middleware pre("save") esegue l'hashing
    const savedAuthor = await author.save();

    // Non restituiamo l'hash della password
    const authorResponse = savedAuthor.toObject();
    delete authorResponse.password;

    res.status(201).json(authorResponse);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email già registrata",
      });
    }

    res.status(500).json({ message: error.message });
  }
}

// GET - Recupera un autore tramite ID
export async function getAuthorbyID(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PUT/PATCH - Aggiorna un autore
export async function upDateAuthor(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    // Accettiamo solo i campi modificabili
    const allowedFields = [
      "nome",
      "cognome",
      "email",
      "dataDiNascita",
      "avatar",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    // Se viene inviata una nuova password,
    // eseguiamo manualmente l'hashing
    if (req.body.password !== undefined) {
      if (typeof req.body.password !== "string" || !req.body.password.trim()) {
        return res.status(400).json({
          message: "Password non valida",
        });
      }

      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email già registrata",
      });
    }

    res.status(500).json({ message: error.message });
  }
}

// DELETE - Elimina un autore
export async function deleteAuthor(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json({
      message: "Author deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PATCH - Aggiorna l'avatar tramite Cloudinary
export async function updateAuthorAvatar(req, res) {
  try {
    const { authorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image not found",
      });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      {
        $set: {
          avatar: req.file.path,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
