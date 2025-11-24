import Cliente from "../models/Cliente.js";

export async function criarCliente(req, res) {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarClientes(req, res) {
  const clientes = await Cliente.find();
  res.json(clientes);
}

export async function atualizarCliente(req, res) {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(cliente);
  } catch (error) {
    res.status(404).json({ error: "Cliente não encontrado" });
  }
}

export async function deletarCliente(req, res) {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: "Cliente removido" });
  } catch {
    res.status(404).json({ error: "Cliente não encontrado" });
  }
}