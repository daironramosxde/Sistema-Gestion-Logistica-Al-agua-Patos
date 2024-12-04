import express from 'express';
import { crearArea, listarAreas, consultarArea, modificarArea, borrarArea } from '../controllers/areaController.js';
import { createAreaSchema, updateAreaSchema, getAreaByIdSchema, deleteAreaSchema } from '../validators/areaValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const areaRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Áreas
 *   description: Operaciones sobre las áreas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la área.
 *         descripcion:
 *           type: string
 *           description: Descripción de la área.
 *       required:
 *         - nombre
 *         - descripcion
 */

/**
 * @swagger
 * /api/areas:
 *   post:
 *     summary: Crear una nueva área
 *     description: Crea una nueva área para el sistema.
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'  # Referencia al esquema 'Area'
 *     responses:
 *       201:
 *         description: Área creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
areaRouter.post('/', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(createAreaSchema), crearArea);

/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Listar todas las áreas
 *     description: Obtiene la lista de todas las áreas existentes.
 *     tags: [Áreas]
 *     responses:
 *       200:
 *         description: Lista de áreas
 *       500:
 *         description: Error interno en el servidor
 */
areaRouter.get('/', verifyToken, verifyRole(['admin', 'asistente']), listarAreas);

/**
 * @swagger
 * /api/areas/{id_area}:
 *   get:
 *     summary: Obtener un área por ID
 *     description: Obtiene los detalles de un área mediante su ID.
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área encontrada
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
areaRouter.get('/:id_area', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(getAreaByIdSchema), consultarArea);

/**
 * @swagger
 * /api/areas/{id_area}:
 *   put:
 *     summary: Actualizar un área
 *     description: Actualiza los detalles de un área. Solo se pueden modificar los campos proporcionados.
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'  # Referencia al esquema 'Area'
 *     responses:
 *       200:
 *         description: Área actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
areaRouter.put('/:id_area', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(updateAreaSchema), modificarArea);

/**
 * @swagger
 * /api/areas/{id_area}:
 *   delete:
 *     summary: Eliminar un área
 *     description: Elimina un área mediante su ID.
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: ID del área a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área eliminada exitosamente
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
areaRouter.delete('/:id_area', verifyToken, verifyRole(['admin']), validatorHandler(deleteAreaSchema), borrarArea);

export default areaRouter;
