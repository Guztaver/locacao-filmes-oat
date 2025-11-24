import { Router } from "express";
import { criarFilme, listarFilmes, atualizarFilme, deletarFilme } from "../Controllers/filmeController.js";

const router = Router();

router.post("/", criarFilme);
router.get("/", listarFilmes);
router.put("/:id", atualizarFilme);
router.delete("/:id", deletarFilme);

export default router;