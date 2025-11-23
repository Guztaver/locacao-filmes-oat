import express from "express";
const router = express.Router();
import Cliente from "../models/Cliente.js";

// CREATE – POST /clientes
router.post("/", async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ – GET /clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE – PUT /clientes/:id
router.put("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE – DELETE /clientes/:id
router.delete("/:id", async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: "Cliente removido!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
