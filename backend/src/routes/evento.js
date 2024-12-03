import express from 'express'; // Importa express para crear el enrutador
import { crearEvento, obtenerEventos, obtenerEventoPorId, actualizarEvento, eliminarEvento } from '../controllers/eventoController.js'; // Importa los controladores

const router = express.Router(); // Crea una instancia de Router

/**
 * @swagger
 * /evento:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_evento:
 *                 type: string
 *                 example: "2024-12-15T10:00:00Z"
 *               descripcion:
 *                 type: string
 *                 example: "Evento de Navidad"
 *               cliente_id:
 *                 type: string
 *                 example: "648d29f0e4f4a8cce401b1f1"
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /evento:
 *   get:
 *     summary: Obtiene todos los eventos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del evento
 *                   fecha_evento:
 *                     type: string
 *                     description: Fecha del evento
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del evento
 *                   cliente_id:
 *                     type: string
 *                     description: ID del cliente
 */

/**
 * @swagger
 * /evento/{id}:
 *   get:
 *     summary: Obtiene un evento por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del evento
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */

/**
 * @swagger
 * /evento/{id}:
 *   put:
 *     summary: Actualiza un evento por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del evento
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_evento:
 *                 type: string
 *                 description: Fecha del evento
 *               descripcion:
 *                 type: string
 *                 description: Descripción del evento
 *               cliente_id:
 *                 type: string
 *                 description: ID del cliente
 */

/**
 * @swagger
 * /evento/{id}:
 *   delete:
 *     summary: Elimina un evento por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del evento
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento eliminado correctamente
 */

router.post('/evento', crearEvento); // Ruta para crear un nuevo evento
router.get('/evento', obtenerEventos); // Ruta para obtener todos los eventos
router.get('/evento/:id', obtenerEventoPorId); // Ruta para obtener un evento por ID
router.put('/evento/:id', actualizarEvento); // Ruta para actualizar un evento por ID
router.delete('/evento/:id', eliminarEvento); // Ruta para eliminar un evento por ID

export default router; // Exporta el enrutador para usarlo en otros archivos
