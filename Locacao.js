import mongoose from "mongoose";

const LocacaoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  filme: { type: mongoose.Schema.Types.ObjectId, ref: "Filme", required: true },
  dataLocacao: { type: Date, default: Date.now },
  dataDevolucao: { type: Date },
  devolvido: { type: Boolean, default: false },
  multa: { type: Number, default: 0 }
}, { timestamps: true });

const Locacao = mongoose.model("Locacao", LocacaoSchema);
export default Locacao;