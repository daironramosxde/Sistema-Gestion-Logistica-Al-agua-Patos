import express from 'express';
import { crearRecurso, listarRecursos, consultarRecurso, modificarRecurso, borrarRecurso } from '../controllers/recursoController.js';
import { createRecursoSchema, updateRecursoSchema, getRecursoByIdSchema, deleteRecursoSchema } from '../validators/recursoValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const recursoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recursos
 *   description: Operaciones sobre los recursos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recurso:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del recurso.
 *         descripcion:
 *           type: string
 *           description: Descripción del recurso.
 *       required:
 *         - nombre
 *         - descripcion
 */

/**
 * @swagger
 * /api/recursos:
 *   post:
 *     summary: Crear un nuevo recurso
 *     description: Crea un nuevo recurso en la base de datos.
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'  # Referencia al esquema 'Recurso'
 *     responses:
 *       201:
 *         description: Recurso creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
recursoRouter.post('/', verifyToken, verifyRole(['admin']), validatorHandler(createRecursoSchema), crearRecurso);

/**
 * @swagger
 * /api/recursos:
 *   get:
 *     summary: Listar todos los recursos
 *     description: Obtiene la lista de todos los recursos existentes.
 *     tags: [Recursos]
 *     responses:
 *       200:
 *         description: Lista de recursos
 *       500:
 *         description: Error interno en el servidor
 */
recursoRouter.get('/', verifyToken, verifyRole(['admin']), listarRecursos);

/**
 * @swagger
 * /api/recursos/{id_recurso}:
 *   get:
 *     summary: Obtener un recurso por ID
 *     description: Obtiene los detalles de un recurso mediante su ID.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         description: ID del recurso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso encontrado
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
recursoRouter.get('/:id_recurso', verifyToken, verifyRole(['admin']), validatorHandler(getRecursoByIdSchema), consultarRecurso);

/**
 * @swagger
 * /api/recursos/{id_recurso}:
 *   put:
 *     summary: Actualizar un recurso
 *     description: Actualiza los detalles de un recurso. Solo se pueden modificar los campos proporcionados.
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         description: ID del recurso
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'  # Referencia al esquema 'Recurso'
 *     responses:
 *       200:
 *         description: Recurso actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
recursoRouter.put('/:id_recurso', verifyToken, verifyRole(['admin']), validatorHandler(updateRecursoSchema), modificarRecurso);

/**
 * @swagger
 * /api/recursos/{id_recurso}:
 *   delete:
 *     summary: Eliminar un recurso
 *     description: Elimina un recurso mediante su ID.
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         description: ID del recurso a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso eliminado exitosamente
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
recursoRouter.delete('/:id_recurso', verifyToken, verifyRole(['admin']), validatorHandler(deleteRecursoSchema), borrarRecurso);

export default recursoRouter;
