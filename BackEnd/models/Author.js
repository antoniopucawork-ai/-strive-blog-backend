import mongoose from "mongoose";
import bcrypt from "bcrypt";
const authorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  cognome: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  dataDiNascita: {
    type: String,
  },
  avatar: {
    type: String,
  },
});
authorSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (e) {
    throw e;
  }
});
const Author = mongoose.model("Author", authorSchema);

export default Author;
