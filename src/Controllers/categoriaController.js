import Categoria from "../models/Categoria.js";

export const buscarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const buscarCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        res.json(categoria);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const criarCategoria = async (req, res) => {
    const categoria = new Categoria({
        nome: req.body.nome,
        descricao: req.body.descricao
    });

    try {
        const novaCategoria = await categoria.save();
        res.status(201).json(novaCategoria);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const atualizarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        res.json(categoria);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deletarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        res.json({ message: "Categoria deletada com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
