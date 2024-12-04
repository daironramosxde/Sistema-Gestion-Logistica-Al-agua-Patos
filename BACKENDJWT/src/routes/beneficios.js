import express from 'express';
import { createBeneficio, getBeneficios, getBeneficio, updateBeneficio, deleteBeneficio } from '../controllers/beneficioController.js';
import { verifyToken, verifyRole } from '../middlewares/Autentication.js';

const BeneficioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Beneficios
 *   description: Operaciones sobre los beneficios de los empleados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Beneficio:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: ID del empleado
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
 */

/**
 * @swagger
 * /api/beneficios:
 *   post:
 *     summary: Crear un nuevo beneficio
 *     description: Crea un nuevo beneficio para un empleado específico.
 *     tags: [Beneficios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beneficio'
 *     responses:
 *       201:
 *         description: Beneficio creado exitosamente
 *       500:
 *         description: Error interno en el servidor
 */
BeneficioRouter.post("/", verifyToken, verifyRole(["admin"]), createBeneficio);

/**
 * @swagger
 * /api/beneficios:
 *   get:
 *     summary: Obtener todos los beneficios
 *     description: Obtiene todos los beneficios registrados.
 *     tags: [Beneficios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de beneficios
 *       500:
 *         description: Error interno en el servidor
 */
BeneficioRouter.get("/", verifyToken, getBeneficios);

/**
 * @swagger
 * /api/beneficios/{id}:
 *   get:
 *     summary: Obtener un beneficio por ID
 *     description: Obtiene un beneficio específico utilizando su ID.
 *     tags: [Beneficios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del beneficio
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Beneficio encontrado
 *       404:
 *         description: Beneficio no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
BeneficioRouter.get("/:id", verifyToken, getBeneficio);

/**
 * @swagger
 * /api/beneficios/{id}:
 *   put:
 *     summary: Actualizar un beneficio
 *     description: Actualiza los detalles de un beneficio existente.
 *     tags: [Beneficios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del beneficio a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beneficio'
 *     responses:
 *       200:
 *         description: Beneficio actualizado exitosamente
 *       500:
 *         description: Error interno en el servidor
 */
BeneficioRouter.put("/:id", verifyToken, updateBeneficio);

/**
 * @swagger
 * /api/beneficios/{id}:
 *   delete:
 *     summary: Eliminar un beneficio
 *     description: Elimina un beneficio mediante su ID.
 *     tags: [Beneficios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del beneficio a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Beneficio eliminado exitosamente
 *       404:
 *         description: Beneficio no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
BeneficioRouter.delete("/:id", verifyToken, deleteBeneficio);

export default BeneficioRouter;
