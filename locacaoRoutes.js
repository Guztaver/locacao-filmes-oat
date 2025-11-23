const express = require("express");
const router = express.Router();
const Locacao = require("../models/Locacao");

// CREATE – POST /locacoes
router.post("/", async (req, res) => {
  try {
    const locacao = await Locacao.create(req.body);
    res.status(201).json(locacao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ – GET /locacoes
router.get("/", async (req, res) => {
  try {
    const locacoes = await Locacao.find().populate("cliente").populate("filme");
    res.json(locacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE – PUT /locacoes/:id
router.put("/:id", async (req, res) => {
  try {
    const locacao = await Locacao.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!locacao) return res.status(404).json({ error: "Locação não encontrada" });

    res.json(locacao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE – DELETE /locacoes/:id
router.delete("/:id", async (req, res) => {
  try {
    const locacao = await Locacao.findByIdAndDelete(req.params.id);

    if (!locacao) return res.status(404).json({ error: "Locação não encontrada" });

    res.json({ message: "Locação removida!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
