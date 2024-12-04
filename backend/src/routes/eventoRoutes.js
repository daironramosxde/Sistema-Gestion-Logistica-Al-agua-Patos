import express from 'express';
import { crearEvento, listarEventos, consultarEvento, modificarEvento, borrarEvento } from '../controllers/eventoController.js';
import { createEventoSchema, updateEventoSchema, getEventoByIdSchema, deleteEventoSchema } from '../validators/eventoValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const eventoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Operaciones sobre los eventos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del evento.
 *         descripcion:
 *           type: string
 *           description: Descripción del evento.
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del evento.
 *         lugar:
 *           type: string
 *           description: Lugar donde se realizará el evento.
 *       required:
 *         - nombre
 *         - descripcion
 *         - fecha
 *         - lugar
 */

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     description: Crea un nuevo evento en la base de datos.
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'  # Referencia al esquema 'Evento'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
eventoRouter.post('/', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(createEventoSchema), crearEvento);

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Listar todos los eventos
 *     description: Obtiene la lista de todos los eventos existentes.
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *       500:
 *         description: Error interno en el servidor
 */
eventoRouter.get('/', verifyToken, verifyRole(['admin', 'asistente']), listarEventos);

/**
 * @swagger
 * /api/eventos/{id_evento}:
 *   get:
 *     summary: Obtener un evento por ID
 *     description: Obtiene los detalles de un evento mediante su ID.
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id_evento
 *         required: true
 *         description: ID del evento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
eventoRouter.get('/:id_evento', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(getEventoByIdSchema), consultarEvento);

/**
 * @swagger
 * /api/eventos/{id_evento}:
 *   put:
 *     summary: Actualizar un evento
 *     description: Actualiza los detalles de un evento. Solo se pueden modificar los campos proporcionados.
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_evento
 *         required: true
 *         description: ID del evento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'  # Referencia al esquema 'Evento'
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
eventoRouter.put('/:id_evento', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(updateEventoSchema), modificarEvento);

/**
 * @swagger
 * /api/eventos/{id_evento}:
 *   delete:
 *     summary: Eliminar un evento
 *     description: Elimina un evento mediante su ID.
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_evento
 *         required: true
 *         description: ID del evento a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
eventoRouter.delete('/:id_evento', verifyToken, verifyRole(['admin']), validatorHandler(deleteEventoSchema), borrarEvento);

export default eventoRouter;
