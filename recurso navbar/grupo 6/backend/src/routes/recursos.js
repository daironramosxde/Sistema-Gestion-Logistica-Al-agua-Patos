import express from "express";

import { crearRecurso, obtenerRecursos, consultarRecurso, actualizarRecurso, borrarRecurso } from "../controllers/controladorRecurso.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Recurso:
 *       type: object
 *       properties:
 *         id_recurso:
 *           type: integer
 *           description: Id autogenerado en la Base de Datos
 *         nombre_recurso:
 *           type: string
 *           description: Nombre del recurso (por ejemplo, "Sillas", "Mesas")
 *         cantidad:
 *           type: integer
 *           description: Cantidad disponible del recurso
 *         ubicacion:
 *           type: string
 *           description: Ubicación del recurso (por ejemplo, "Almacén 1")
 *       required:
 *         - nombre_recurso
 *         - cantidad
 *         - ubicacion
 *       example:
 *         nombre_recurso: Silla
 *         cantidad: 50
 *         ubicacion: Almacén 1
 */

/**
 * @swagger
 * /recursos:
 *   post:
 *     summary: Registra un nuevo recurso en la Base de Datos
 *     tags: [recursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'
 *     responses:
 *       200:
 *         description: Nuevo recurso creado en la Base de Datos
 *       500:
 *         description: Error al crear el recurso
 */

/**
 * @swagger
 * /recursos/{id}:
 *   delete:
 *     summary: Elimina un recurso de la Base de Datos
 *     tags: [recursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recurso a eliminar
 *     responses:
 *       200:
 *         description: Recurso eliminado exitosamente
 *       404:
 *         description: No se encontró el recurso
 */

/**
 * @swagger
 * /api/recursos:
 *   get:
 *     summary: Retorna los registros de los recursos
 *     tags: [recursos]
 *     responses:
 *       200:
 *         description: Lista de los recursos en la Base de Datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recurso'
 */

/**
 * @swagger
 * /recursos/{id}:
 *   put:
 *     summary: Actualiza un recurso existente en la Base de Datos
 *     tags: [recursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recurso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'
 *     responses:
 *       200:
 *         description: Recurso actualizado exitosamente
 *       404:
 *         description: No se encontró el recurso
 */

router.post("/recursos", crearRecurso);
router.get("/recursos", obtenerRecursos);
router.get("/recursos/:id", consultarRecurso);
router.put("/recursos/:id", actualizarRecurso);
router.delete("/recursos/:id", borrarRecurso);

export default router;
