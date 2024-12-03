import express from "express";
import {
  registrarHorario,
  listarHorarios,
  consultarHorario,
  modificarHorario,
  borrarHorario,
} from "../controllers/horariosController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Horario:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: ID del empleado asociado
 *         dia_semana:
 *           type: string
 *           description: Día de la semana
 *         hora_entrada:
 *           type: string
 *           format: time
 *           description: Hora de entrada
 *         hora_salida:
 *           type: string
 *           format: time
 *           description: Hora de salida
 *       required:
 *         - id_empleado
 *         - dia_semana
 *         - hora_entrada
 *         - hora_salida
 *       example:
 *         id_empleado: "648d29f0e4f4a8cce401b1f1"
 *         dia_semana: "Lunes"
 *         hora_entrada: "08:00"
 *         hora_salida: "16:00"
 */

/**
 * @swagger
 * /api/horarios:
 *   post:
 *     summary: Registrar un nuevo horario
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       201:
 *         description: Horario registrado
 */
router.post("/horarios", registrarHorario);

/**
 * @swagger
 * /api/horarios:
 *   get:
 *     summary: Listar todos los horarios
 *     tags: [Horarios]
 *     responses:
 *       200:
 *         description: Lista de horarios
 */
router.get("/horarios", listarHorarios);

/**
 * @swagger
 * /api/horarios/{id}:
 *   get:
 *     summary: Consultar un horario por ID
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del horario
 *     responses:
 *       200:
 *         description: Datos del horario
 */
router.get("/horarios/:id", consultarHorario);

/**
 * @swagger
 * /api/horarios/{id}:
 *   put:
 *     summary: Actualizar un horario por ID
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del horario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: Horario actualizado
 */
router.put("/horarios/:id", modificarHorario);

/**
 * @swagger
 * /api/horarios/{id}:
 *   delete:
 *     summary: Eliminar un horario por ID
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del horario
 *     responses:
 *       200:
 *         description: Horario eliminado
 */
router.delete("/horarios/:id", borrarHorario);

export default router;
