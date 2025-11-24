import express from "express";
import {
    buscarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    atualizarCategoria,
    deletarCategoria
} from "../Controllers/categoriaController.js";

const router = express.Router();

/**
 * @openapi
 * /categorias:
 *   get:
 *     summary: Listar todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 */
router.get("/", buscarCategorias);

/**
 * @openapi
 * /categorias/{id}:
 *   get:
 *     summary: Obter uma categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Dados da categoria retornados com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.get("/:id", buscarCategoriaPorId);

/**
 * @openapi
 * /categorias:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Categorias]
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
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */
router.post("/", criarCategoria);

/**
 * @openapi
 * /categorias/{id}:
 *   put:
 *     summary: Atualizar uma categoria existente
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.put("/:id", atualizarCategoria);

/**
 * @openapi
 * /categorias/{id}:
 *   delete:
 *     summary: Remover uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.delete("/:id", deletarCategoria);

export default router;
