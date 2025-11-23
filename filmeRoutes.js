const express = require("express");
const router = express.Router();
const Filme = require("../models/Filme");

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

module.exports = router;
