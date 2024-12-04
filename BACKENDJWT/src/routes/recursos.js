import express from "express";
import {createRecurso,getRecursos,consultRecurso,updateRecurso,deleteRecurso} from "../controllers/recursoController.js";
import { verifyToken, verifyRole } from "../middlewares/Autentication.js"; // Suponiendo que ya tienes esta configuración para autenticar y verificar roles

const RecursoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recursos
 *   description: Operaciones sobre los recursos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recurso:
 *       type: object
 *       properties:
 *         nombre_recurso:
 *           type: string
 *           description: Nombre del recurso
 *         cantidad:
 *           type: number
 *           description: Cantidad de recursos disponibles
 *         ubicacion:
 *           type: string
 *           description: Ubicación del recurso
 *       required:
 *         - nombre_recurso
 *         - cantidad
 *         - ubicacion
 */

/**
 * @swagger
 * /api/recursos:
 *   post:
 *     summary: Crear un nuevo recurso
 *     description: Crea un nuevo recurso con la información proporcionada.
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'
 *     responses:
 *       201:
 *         description: Recurso creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
RecursoRouter.post("/", verifyToken, verifyRole(["admin"]), createRecurso);

/**
 * @swagger
 * /api/recursos:
 *   get:
 *     summary: Obtener todos los recursos
 *     description: Obtiene todos los recursos disponibles.
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de recursos
 *       500:
 *         description: Error interno en el servidor
 */
RecursoRouter.get("/", verifyToken, getRecursos);

/**
 * @swagger
 * /api/recursos/{id}:
 *   get:
 *     summary: Consultar un recurso por ID
 *     description: Obtiene los detalles de un recurso mediante su ID.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recurso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso encontrado
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
RecursoRouter.get("/:id", verifyToken, consultRecurso);

/**
 * @swagger
 * /api/recursos/{id}:
 *   put:
 *     summary: Actualizar un recurso
 *     description: Actualiza los detalles de un recurso.
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recurso
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'
 *     responses:
 *       200:
 *         description: Recurso actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
RecursoRouter.put("/:id", verifyToken, updateRecurso);

/**
 * @swagger
 * /api/recursos/{id}:
 *   delete:
 *     summary: Eliminar un recurso
 *     description: Elimina un recurso mediante su identificador único.
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recurso a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso eliminado exitosamente
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
RecursoRouter.delete("/:id", verifyToken, deleteRecurso);

export default RecursoRouter;
