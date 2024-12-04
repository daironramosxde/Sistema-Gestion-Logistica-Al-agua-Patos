import express from 'express';
import { createEvento, getEventos, getEvento, updateEvento, deleteEvento } from '../controllers/eventoController.js';
import { verifyToken, verifyRole } from '../middlewares/Autentication.js'; // Asumiendo que tienes autenticación y roles

const EventoRouter = express.Router();

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
 *         fecha_evento:
 *           type: string
 *           format: date-time
 *           description: Fecha del evento
 *         descripcion:
 *           type: string
 *           description: Descripción del evento
 *         cliente_id:
 *           type: string
 *           description: ID del cliente asociado al evento
 *       required:
 *         - fecha_evento
 *         - descripcion
 *         - cliente_id
 */

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     description: Crea un nuevo evento con la información proporcionada.
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
EventoRouter.post("/", verifyToken, verifyRole(["admin"]), createEvento);

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Obtener todos los eventos
 *     description: Obtiene todos los eventos registrados en el sistema.
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos
 *       500:
 *         description: Error interno en el servidor
 */
EventoRouter.get("/", verifyToken, getEventos);

/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     description: Obtiene los detalles de un evento mediante su ID.
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
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
EventoRouter.get("/:id", verifyToken, getEvento);

/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     description: Actualiza los detalles de un evento.
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del evento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
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
EventoRouter.put("/:id", verifyToken, updateEvento);

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     description: Elimina un evento mediante su ID.
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
EventoRouter.delete("/:id", verifyToken, deleteEvento);

export default EventoRouter;
