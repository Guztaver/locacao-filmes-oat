import mongoose from "mongoose";

const AtorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    dataNascimento: { type: Date },
    nacionalidade: { type: String },
    biografia: { type: String }
});

export default mongoose.model("Ator", AtorSchema);
