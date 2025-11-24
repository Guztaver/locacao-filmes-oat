import express from "express";
const router = express.Router();
import Filme from "../models/Filme.js";

// CREATE – POST /filmes
router.post("/", async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ – GET /filmes
router.get("/", async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ – GET /filmes/:id
router.get("/:id", async (req, res) => {
  try {
    const filme = await Filme.findById(req.params.id);
    if (!filme) return res.status(404).json({ error: "Filme não encontrado" });
    res.json(filme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE – PUT /filmes/:id
router.put("/:id", async (req, res) => {
  try {
    const filme = await Filme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(filme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE – DELETE /filmes/:id
router.delete("/:id", async (req, res) => {
  try {
    await Filme.findByIdAndDelete(req.params.id);
    res.json({ message: "Filme removido!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
