import express from 'express';
import { crearHorario, listarHorarios, consultarHorario, modificarHorario, borrarHorario } from '../controllers/horariosController.js';
import { createHorarioSchema, updateHorarioSchema, getHorarioByIdSchema, deleteHorarioSchema } from '../validators/horarioValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const horarioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Horarios
 *   description: Operaciones sobre los horarios
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
 *           description: ID del empleado al que corresponde el horario.
 *         dia_semana:
 *           type: string
 *           description: Día de la semana para el horario.
 *         hora_entrada:
 *           type: string
 *           format: time
 *           description: Hora de entrada del empleado.
 *         hora_salida:
 *           type: string
 *           format: time
 *           description: Hora de salida del empleado.
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
 *     description: Crea un nuevo horario para un empleado en la base de datos.
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'  # Referencia al esquema 'Horario'
 *     responses:
 *       201:
 *         description: Horario creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
horarioRouter.post('/', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(createHorarioSchema), crearHorario);

/**
 * @swagger
 * /api/horarios:
 *   get:
 *     summary: Listar todos los horarios
 *     description: Obtiene la lista de todos los horarios existentes.
 *     tags: [Horarios]
 *     responses:
 *       200:
 *         description: Lista de horarios
 *       500:
 *         description: Error interno en el servidor
 */
horarioRouter.get('/', verifyToken, verifyRole(['admin', 'asistente']), listarHorarios);

/**
 * @swagger
 * /api/horarios/{id_horario}:
 *   get:
 *     summary: Obtener un horario por ID
 *     description: Obtiene los detalles de un horario mediante su ID.
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id_horario
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
horarioRouter.get('/:id_horario', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(getHorarioByIdSchema), consultarHorario);

/**
 * @swagger
 * /api/horarios/{id_horario}:
 *   put:
 *     summary: Actualizar un horario
 *     description: Actualiza los detalles de un horario. Solo se pueden modificar los campos proporcionados.
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_horario
 *         required: true
 *         description: ID del horario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'  # Referencia al esquema 'Horario'
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
horarioRouter.put('/:id_horario', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(updateHorarioSchema), modificarHorario);

/**
 * @swagger
 * /api/horarios/{id_horario}:
 *   delete:
 *     summary: Eliminar un horario
 *     description: Elimina un horario mediante su ID.
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_horario
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
horarioRouter.delete('/:id_horario', verifyToken, verifyRole(['admin']), validatorHandler(deleteHorarioSchema), borrarHorario);

export default horarioRouter;
