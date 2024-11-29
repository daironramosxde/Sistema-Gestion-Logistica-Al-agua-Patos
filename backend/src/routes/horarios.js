import express from "express";
import {
  crearHorario,
  obtenerHorarios,
  actualizarHorario,
  eliminarHorario,
} from "../controllers/horariosController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Horario:
 *       type: object
 *       properties:
 *         idEmpleado:
 *           type: string
 *           description: ID del empleado asociado al horario
 *         diaSemana:
 *           type: string
 *           description: Día de la semana del horario (por ejemplo, "Lunes", "Martes")
 *         horaEntrada:
 *           type: string
 *           format: time
 *           description: Hora de entrada (formato HH:mm:ss)
 *         horaSalida:
 *           type: string
 *           format: time
 *           description: Hora de salida (formato HH:mm:ss)
 *       required:
 *         - idEmpleado
 *         - diaSemana
 *         - horaEntrada
 *         - horaSalida
 *       example:
 *         idEmpleado: "64fdf8a4c9b34d0034f865b2"
 *         diaSemana: "Lunes"
 *         horaEntrada: "08:00:00"
 *         horaSalida: "17:00:00"
 */

/**
 * @swagger
 * /horarios:
 *   post:
 *     summary: Registra un nuevo horario en la Base de Datos
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: Nuevo horario creado en la Base de Datos
 *       500:
 *         description: Error al crear el horario
 */

/**
 * @swagger
 * /horarios:
 *   get:
 *     summary: Retorna los registros de los horarios
 *     tags: [Horarios]
 *     responses:
 *       200:
 *         description: Lista de los horarios en la Base de Datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Horario'
 */


/**
 * @swagger
 * /horarios/{id}:
 *   put:
 *     summary: Actualiza un horario existente en la Base de Datos
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del horario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: Horario actualizado exitosamente
 *       404:
 *         description: No se encontró el horario
 */

/**
 * @swagger
 * /horarios/{id}:
 *   delete:
 *     summary: Elimina un horario de la Base de Datos
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del horario a eliminar
 *     responses:
 *       200:
 *         description: Horario eliminado exitosamente
 *       404:
 *         description: No se encontró el horario
 */

router.post("/horarios", crearHorario);
router.get("/horarios", obtenerHorarios);
router.put("/horarios/:id", actualizarHorario);
router.delete("/horarios/:id", eliminarHorario);

export default router;
