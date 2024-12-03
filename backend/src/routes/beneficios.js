import express from "express";
import {
  registrarBeneficio,
  listarBeneficios,
  consultarBeneficio,
  modificarBeneficio,
  borrarBeneficio,
} from "../controllers/beneficioController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Beneficio:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: ID del empleado asociado
 *         monto:
 *           type: number
 *           description: Monto del beneficio
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del beneficio
 *       required:
 *         - id_empleado
 *         - monto
 *         - fecha
 *       example:
 *         id_empleado: "648d29f0e4f4a8cce401b1f1"
 *         monto: 500000
 *         fecha: "2024-12-03"
 */

/**
 * @swagger
 * /api/beneficios:
 *   post:
 *     summary: Registrar un nuevo beneficio
 *     tags: [Beneficios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beneficio'
 *     responses:
 *       201:
 *         description: Beneficio registrado
 */
router.post("/beneficios", registrarBeneficio);

/**
 * @swagger
 * /api/beneficios:
 *   get:
 *     summary: Listar todos los beneficios
 *     tags: [Beneficios]
 *     responses:
 *       200:
 *         description: Lista de beneficios
 */
router.get("/beneficios", listarBeneficios);

/**
 * @swagger
 * /api/beneficios/{id}:
 *   get:
 *     summary: Consultar un beneficio por ID
 *     tags: [Beneficios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del beneficio
 *     responses:
 *       200:
 *         description: Datos del beneficio
 */
router.get("/beneficios/:id", consultarBeneficio);

/**
 * @swagger
 * /api/beneficios/{id}:
 *   put:
 *     summary: Actualizar un beneficio por ID
 *     tags: [Beneficios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del beneficio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beneficio'
 *     responses:
 *       200:
 *         description: Beneficio actualizado
 */
router.put("/beneficios/:id", modificarBeneficio);

/**
 * @swagger
 * /api/beneficios/{id}:
 *   delete:
 *     summary: Eliminar un beneficio por ID
 *     tags: [Beneficios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del beneficio
 *     responses:
 *       200:
 *         description: Beneficio eliminado
 */
router.delete("/beneficios/:id", borrarBeneficio);

export default router;
