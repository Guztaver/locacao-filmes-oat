import Ator from "../models/Ator.js";

export const buscarAtores = async (req, res) => {
    try {
        const atores = await Ator.find();
        res.json(atores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const buscarAtorPorId = async (req, res) => {
    try {
        const ator = await Ator.findById(req.params.id);
        if (!ator) {
            return res.status(404).json({ message: "Ator não encontrado" });
        }
        res.json(ator);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const criarAtor = async (req, res) => {
    const ator = new Ator({
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        nacionalidade: req.body.nacionalidade,
        biografia: req.body.biografia
    });

    try {
        const novoAtor = await ator.save();
        res.status(201).json(novoAtor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const atualizarAtor = async (req, res) => {
    try {
        const ator = await Ator.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!ator) {
            return res.status(404).json({ message: "Ator não encontrado" });
        }
        res.json(ator);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deletarAtor = async (req, res) => {
    try {
        const ator = await Ator.findByIdAndDelete(req.params.id);
        if (!ator) {
            return res.status(404).json({ message: "Ator não encontrado" });
        }
        res.json({ message: "Ator deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
