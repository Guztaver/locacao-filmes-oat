import mongoose from "mongoose";

const FilmeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  ano: { type: Number, required: true }
});

export default mongoose.model("Filme", FilmeSchema);
