import { Router } from "express";
import { criarCliente, listarClientes, atualizarCliente, deletarCliente } from "../Controllers/clienteController.js";

const router = Router();

router.post("/", criarCliente);
router.get("/", listarClientes);
router.put("/:id", atualizarCliente);
router.delete("/:id", deletarCliente);

export default router;