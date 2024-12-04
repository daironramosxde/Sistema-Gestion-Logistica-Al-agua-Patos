import express from "express";
import {createAusencia,getAusencias,consultAusencia,updateAusencia,deleteAusencia} from "../controllers/ausenciaController.js";
import { validatorHandler } from "../middlewares/validator.handler.js";
import { verifyToken, verifyRole } from "../middlewares/Autentication.js"; // Asumiendo que ya tienes esta configuración para autenticar y verificar roles

const AusenciaRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ausencias
 *   description: Operaciones sobre las ausencias de los empleados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ausencia:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: ID del empleado que tiene la ausencia.
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la ausencia.
 *         motivo:
 *           type: string
 *           description: Motivo de la ausencia.
 *       required:
 *         - id_empleado
 *         - fecha
 *         - motivo
 */

/**
 * @swagger
 * /api/ausencias:
 *   post:
 *     summary: Crear una nueva ausencia
 *     description: Crea una nueva ausencia con la información proporcionada.
 *     tags: [Ausencias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ausencia'
 *     responses:
 *       201:
 *         description: Ausencia creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
AusenciaRouter.post("/", verifyToken, verifyRole(["admin"]), createAusencia);

/**
 * @swagger
 * /api/ausencias:
 *   get:
 *     summary: Obtener todas las ausencias
 *     description: Obtiene todas las ausencias de los empleados.
 *     tags: [Ausencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ausencias
 *       500:
 *         description: Error interno en el servidor
 */
AusenciaRouter.get("/", verifyToken, getAusencias);

/**
 * @swagger
 * /api/ausencias/{id}:
 *   get:
 *     summary: Consultar una ausencia por ID
 *     description: Obtiene los detalles de una ausencia mediante su ID.
 *     tags: [Ausencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ausencia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ausencia encontrada
 *       404:
 *         description: Ausencia no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
AusenciaRouter.get("/:id", verifyToken, consultAusencia);

/**
 * @swagger
 * /api/ausencias/{id}:
 *   put:
 *     summary: Actualizar una ausencia
 *     description: Actualiza los detalles de una ausencia.
 *     tags: [Ausencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ausencia
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ausencia'
 *     responses:
 *       200:
 *         description: Ausencia actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Ausencia no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
AusenciaRouter.put("/:id", verifyToken, updateAusencia);

/**
 * @swagger
 * /api/ausencias/{id}:
 *   delete:
 *     summary: Eliminar una ausencia
 *     description: Elimina una ausencia mediante su identificador único.
 *     tags: [Ausencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ausencia a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ausencia eliminada exitosamente
 *       404:
 *         description: Ausencia no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
AusenciaRouter.delete("/:id", verifyToken, deleteAusencia);

export default AusenciaRouter;
