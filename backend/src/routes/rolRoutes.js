import express from 'express';
import { crearRol, listarRoles, consultarRol, modificarRol, borrarRol } from '../controllers/rolController.js';
import { createRolSchema, updateRolSchema, getRolByIdSchema, deleteRolSchema } from '../validators/rolValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const rolRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Operaciones sobre los roles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del rol.
 *         descripcion:
 *           type: string
 *           description: Descripción del rol.
 *       required:
 *         - nombre
 *         - descripcion
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: Crea un nuevo rol en la base de datos.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'  # Referencia al esquema 'Rol'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
rolRouter.post('/', verifyToken, verifyRole(['admin']), validatorHandler(createRolSchema), crearRol);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar todos los roles
 *     description: Obtiene la lista de todos los roles existentes.
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *       500:
 *         description: Error interno en el servidor
 */
rolRouter.get('/', verifyToken, verifyRole(['admin']), listarRoles);

/**
 * @swagger
 * /api/roles/{id_rol}:
 *   get:
 *     summary: Obtener un rol por ID
 *     description: Obtiene los detalles de un rol mediante su ID.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
rolRouter.get('/:id_rol', verifyToken, verifyRole(['admin']), validatorHandler(getRolByIdSchema), consultarRol);

/**
 * @swagger
 * /api/roles/{id_rol}:
 *   put:
 *     summary: Actualizar un rol
 *     description: Actualiza los detalles de un rol. Solo se pueden modificar los campos proporcionados.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'  # Referencia al esquema 'Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
rolRouter.put('/:id_rol', verifyToken, verifyRole(['admin']), validatorHandler(updateRolSchema), modificarRol);

/**
 * @swagger
 * /api/roles/{id_rol}:
 *   delete:
 *     summary: Eliminar un rol
 *     description: Elimina un rol mediante su ID.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         description: ID del rol a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
rolRouter.delete('/:id_rol', verifyToken, verifyRole(['admin']), validatorHandler(deleteRolSchema), borrarRol);

export default rolRouter;
