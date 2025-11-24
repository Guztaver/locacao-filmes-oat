import Filme from "../models/Filme.js";

export async function criarFilme(req, res) {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarFilmes(req, res) {
  const filtros = {};
  
  if (req.query.genero) filtros.genero = req.query.genero;
  if (req.query.disponivel) filtros.disponivel = req.query.disponivel;

  const filmes = await Filme.find(filtros);
  res.json(filmes);
}

export async function atualizarFilme(req, res) {
  try {
    const filme = await Filme.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(filme);
  } catch {
    res.status(404).json({ error: "Filme não encontrado" });
  }
}

export async function deletarFilme(req, res) {
  try {
    await Filme.findByIdAndDelete(req.params.id);
    res.json({ message: "Filme removido" });
  } catch {
    res.status(404).json({ error: "Filme não encontrado" });
  }
}