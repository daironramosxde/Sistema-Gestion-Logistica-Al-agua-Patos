import express from 'express';
import { createRol, getRoles, consultRol, updateRol, deleteRol } from '../controllers/rolController.js';
import { verifyToken, verifyRole } from '../middlewares/Autentication.js';

const RolRouter = express.Router();

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
 *           description: Nombre del rol
 *         descripcion:
 *           type: string
 *           description: Descripción del rol
 *       required:
 *         - nombre
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: Crea un nuevo rol con la información proporcionada.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       500:
 *         description: Error interno en el servidor
 */
RolRouter.post("/", verifyToken, verifyRole(["admin"]), createRol);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     description: Obtiene todos los roles disponibles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *       500:
 *         description: Error interno en el servidor
 */
RolRouter.get("/", verifyToken, getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Consultar un rol por ID
 *     description: Obtiene los detalles de un rol mediante su ID.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
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
RolRouter.get("/:id", verifyToken, consultRol);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     description: Actualiza los detalles de un rol.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       500:
 *         description: Error interno en el servidor
 */
RolRouter.put("/:id", verifyToken, updateRol);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     description: Elimina un rol mediante su identificador único.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
RolRouter.delete("/:id", verifyToken, deleteRol);

export default RolRouter;
