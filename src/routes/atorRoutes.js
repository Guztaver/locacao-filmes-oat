import express from "express";
import {
    buscarAtores,
    buscarAtorPorId,
    criarAtor,
    atualizarAtor,
    deletarAtor
} from "../Controllers/atorController.js";

const router = express.Router();

/**
 * @openapi
 * /atores:
 *   get:
 *     summary: Listar todos os atores
 *     tags: [Atores]
 *     responses:
 *       200:
 *         description: Lista de atores retornada com sucesso
 */
router.get("/", buscarAtores);

/**
 * @openapi
 * /atores/{id}:
 *   get:
 *     summary: Obter um ator pelo ID
 *     tags: [Atores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do ator
 *     responses:
 *       200:
 *         description: Dados do ator retornados com sucesso
 *       404:
 *         description: Ator não encontrado
 */
router.get("/:id", buscarAtorPorId);

/**
 * @openapi
 * /atores:
 *   post:
 *     summary: Criar um novo ator
 *     tags: [Atores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               nacionalidade:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ator criado com sucesso
 */
router.post("/", criarAtor);

/**
 * @openapi
 * /atores/{id}:
 *   put:
 *     summary: Atualizar um ator existente
 *     tags: [Atores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do ator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               nacionalidade:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ator atualizado com sucesso
 *       404:
 *         description: Ator não encontrado
 */
router.put("/:id", atualizarAtor);

/**
 * @openapi
 * /atores/{id}:
 *   delete:
 *     summary: Remover um ator
 *     tags: [Atores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do ator
 *     responses:
 *       200:
 *         description: Ator removido com sucesso
 *       404:
 *         description: Ator não encontrado
 */
router.delete("/:id", deletarAtor);

export default router;
