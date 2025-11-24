import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true }
}, { timestamps: true });

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;