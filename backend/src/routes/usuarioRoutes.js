import express from 'express';
import { crearUsuario, listarUsuarios, consultarUsuario, modificarUsuario, borrarUsuario } from '../controllers/usuarioController.js';
import { createUsuarioSchema, updateUsuarioSchema, getUsuarioByIdSchema, deleteUsuarioSchema } from '../validators/usuarioValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const usuarioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones sobre los usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del usuario.
 *         email:
 *           type: string
 *           description: Email del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *       required:
 *         - nombre
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'  # Referencia al esquema 'Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
usuarioRouter.post('/', verifyToken, verifyRole(['admin']), validatorHandler(createUsuarioSchema), crearUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     description: Obtiene la lista de todos los usuarios existentes.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno en el servidor
 */
usuarioRouter.get('/', verifyToken, verifyRole(['admin']), listarUsuarios);

/**
 * @swagger
 * /api/usuarios/{id_usuario}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Obtiene los detalles de un usuario mediante su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usuarioRouter.get('/:id_usuario', verifyToken, verifyRole(['admin']), validatorHandler(getUsuarioByIdSchema), consultarUsuario);

/**
 * @swagger
 * /api/usuarios/{id_usuario}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los detalles de un usuario. Solo se pueden modificar los campos proporcionados.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'  # Referencia al esquema 'Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usuarioRouter.put('/:id_usuario', verifyToken, verifyRole(['admin']), validatorHandler(updateUsuarioSchema), modificarUsuario);

/**
 * @swagger
 * /api/usuarios/{id_usuario}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario mediante su ID.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usuarioRouter.delete('/:id_usuario', verifyToken, verifyRole(['admin']), validatorHandler(deleteUsuarioSchema), borrarUsuario);

export default usuarioRouter;
