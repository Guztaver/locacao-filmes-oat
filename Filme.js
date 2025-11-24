import mongoose from "mongoose";

const FilmeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  ano: { type: Number, required: true },
  disponivel: { type: Boolean, default: true }
}, { timestamps: true });

const Filme = mongoose.model("Filme", FilmeSchema);
export default Filme;