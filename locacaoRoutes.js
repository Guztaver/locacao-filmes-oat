import { Router } from "express";
import { criarLocacao, listarLocacoes, devolverFilme } from "../Controllers/locacaoController.js";

const router = Router();

router.post("/", criarLocacao);
router.get("/", listarLocacoes);
router.put("/:id/devolver", devolverFilme);

export default router;