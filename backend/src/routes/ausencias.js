import express from "express";
import {
  registrarAusencia,
  listarAusencias,
  consultarAusencia,
  modificarAusencia,
  borrarAusencia,
} from "../controllers/ausenciaController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ausencia:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: ID del empleado asociado
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la ausencia
 *         motivo:
 *           type: string
 *           description: Motivo de la ausencia
 *       required:
 *         - id_empleado
 *         - fecha
 *         - motivo
 *       example:
 *         id_empleado: "648d29f0e4f4a8cce401b1f1"
 *         fecha: "2024-11-21"
 *         motivo: "Enfermedad"
 */

/**
 * @swagger
 * /api/ausencias:
 *   post:
 *     summary: Registrar una nueva ausencia
 *     tags: [Ausencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ausencia'
 *     responses:
 *       201:
 *         description: Ausencia registrada
 */

router.post("/ausencias", registrarAusencia);

/**
 * @swagger
 * /api/ausencias:
 *   get:
 *     summary: Listar todas las ausencias
 *     tags: [Ausencias]
 *     responses:
 *       200:
 *         description: Lista de ausencias
 */
router.get("/ausencias", listarAusencias);

/**
 * @swagger
 * /api/ausencias/{id}:
 *   get:
 *     summary: Consultar una ausencia por ID
 *     tags: [Ausencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la ausencia
 *     responses:
 *       200:
 *         description: Datos de la ausencia
 */
router.get("/ausencias/:id", consultarAusencia);

/**
 * @swagger
 * /api/ausencias/{id}:
 *   put:
 *     summary: Actualizar una ausencia por ID
 *     tags: [Ausencias]
 */
router.put("/ausencias/:id", modificarAusencia);

/**
 * @swagger
 * /api/ausencias/{id}:
 *   delete:
 *     summary: Eliminar una ausencia por ID
 *     tags: [Ausencias]
 */
router.delete("/ausencias/:id", borrarAusencia);

export default router;
