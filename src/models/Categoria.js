import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: { type: String }
});

export default mongoose.model("Categoria", CategoriaSchema);
