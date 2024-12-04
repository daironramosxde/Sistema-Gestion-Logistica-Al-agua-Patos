import express from 'express';
import { createHorario, getHorarios, getHorario, updateHorario, deleteHorario } from '../controllers/horarioController.js';
import { verifyToken, verifyRole } from '../middlewares/Autentication.js'; // Asumiendo que tienes autenticación y roles

const HorarioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Horarios
 *   description: Operaciones sobre los horarios de los empleados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Horario:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: ID del empleado al que corresponde el horario
 *         dia_semana:
 *           type: string
 *           enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
 *           description: Día de la semana
 *         hora_entrada:
 *           type: string
 *           description: Hora de entrada del empleado
 *         hora_salida:
 *           type: string
 *           description: Hora de salida del empleado
 *       required:
 *         - id_empleado
 *         - dia_semana
 *         - hora_entrada
 *         - hora_salida
 */

/**
 * @swagger
 * /api/horarios:
 *   post:
 *     summary: Crear un nuevo horario
 *     description: Crea un nuevo horario para un empleado con la información proporcionada.
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       201:
 *         description: Horario creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
HorarioRouter.post("/", verifyToken, verifyRole(["admin"]), createHorario);

/**
 * @swagger
 * /api/horarios:
 *   get:
 *     summary: Obtener todos los horarios
 *     description: Obtiene todos los horarios registrados para los empleados.
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de horarios
 *       500:
 *         description: Error interno en el servidor
 */
HorarioRouter.get("/", verifyToken, getHorarios);

/**
 * @swagger
 * /api/horarios/{id}:
 *   get:
 *     summary: Obtener un horario por ID
 *     description: Obtiene los detalles de un horario mediante su ID.
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del horario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Horario encontrado
 *       404:
 *         description: Horario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
HorarioRouter.get("/:id", verifyToken, getHorario);

/**
 * @swagger
 * /api/horarios/{id}:
 *   put:
 *     summary: Actualizar un horario
 *     description: Actualiza los detalles de un horario.
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del horario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: Horario actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Horario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
HorarioRouter.put("/:id", verifyToken, updateHorario);

/**
 * @swagger
 * /api/horarios/{id}:
 *   delete:
 *     summary: Eliminar un horario
 *     description: Elimina un horario mediante su ID.
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del horario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Horario eliminado exitosamente
 *       404:
 *         description: Horario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
HorarioRouter.delete("/:id", verifyToken, deleteHorario);

export default HorarioRouter;
