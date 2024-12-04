import express from 'express';
import { crearAusencia, listarAusencias, consultarAusencia, modificarAusencia, borrarAusencia } from '../controllers/ausenciaController.js';
import { createAusenciaSchema, updateAusenciaSchema, getAusenciaByIdSchema, deleteAusenciaSchema } from '../validators/ausenciaValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const ausenciaRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ausencias
 *   description: Operaciones sobre las ausencias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ausencia:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: ID del empleado al que corresponde la ausencia.
 *         fecha_inicio:
 *           type: string
 *           description: Fecha de inicio de la ausencia.
 *         fecha_fin:
 *           type: string
 *           description: Fecha de finalización de la ausencia.
 *         motivo:
 *           type: string
 *           description: Motivo de la ausencia.
 *       required:
 *         - id_empleado
 *         - fecha_inicio
 *         - fecha_fin
 *         - motivo
 */

/**
 * @swagger
 * /api/ausencias:
 *   post:
 *     summary: Crear una nueva ausencia
 *     description: Crea una nueva ausencia para un empleado.
 *     tags: [Ausencias]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ausencia'  # Referencia al esquema 'Ausencia'
 *     responses:
 *       201:
 *         description: Ausencia creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
ausenciaRouter.post('/', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(createAusenciaSchema), crearAusencia);

/**
 * @swagger
 * /api/ausencias:
 *   get:
 *     summary: Listar todas las ausencias
 *     description: Obtiene la lista de todas las ausencias existentes.
 *     tags: [Ausencias]
 *     responses:
 *       200:
 *         description: Lista de ausencias
 *       500:
 *         description: Error interno en el servidor
 */
ausenciaRouter.get('/', verifyToken, verifyRole(['admin', 'asistente']), listarAusencias);

/**
 * @swagger
 * /api/ausencias/{id_ausencia}:
 *   get:
 *     summary: Obtener una ausencia por ID
 *     description: Obtiene los detalles de una ausencia mediante su ID.
 *     tags: [Ausencias]
 *     parameters:
 *       - in: path
 *         name: id_ausencia
 *         required: true
 *         description: ID de la ausencia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ausencia encontrada
 *       404:
 *         description: Ausencia no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
ausenciaRouter.get('/:id_ausencia', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(getAusenciaByIdSchema), consultarAusencia);

/**
 * @swagger
 * /api/ausencias/{id_ausencia}:
 *   put:
 *     summary: Actualizar una ausencia
 *     description: Actualiza los detalles de una ausencia. Solo se pueden modificar los campos proporcionados.
 *     tags: [Ausencias]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_ausencia
 *         required: true
 *         description: ID de la ausencia
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ausencia'  # Referencia al esquema 'Ausencia'
 *     responses:
 *       200:
 *         description: Ausencia actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Ausencia no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
ausenciaRouter.put('/:id_ausencia', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(updateAusenciaSchema), modificarAusencia);

/**
 * @swagger
 * /api/ausencias/{id_ausencia}:
 *   delete:
 *     summary: Eliminar una ausencia
 *     description: Elimina una ausencia mediante su ID.
 *     tags: [Ausencias]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_ausencia
 *         required: true
 *         description: ID de la ausencia a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ausencia eliminada exitosamente
 *       404:
 *         description: Ausencia no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
ausenciaRouter.delete('/:id_ausencia', verifyToken, verifyRole(['admin']), validatorHandler(deleteAusenciaSchema), borrarAusencia);

export default ausenciaRouter;
