import express from 'express';
import { createCliente, getClientes, getCliente, updateCliente, deleteCliente } from '../controllers/clienteController.js';
import { verifyToken, verifyRole } from '../middlewares/Autentication.js'; // Asumiendo que tienes autenticación y roles

const ClienteRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones sobre los clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         nombre_cliente:
 *           type: string
 *           description: Nombre del cliente
 *         telefono:
 *           type: string
 *           description: Teléfono del cliente
 *         email:
 *           type: string
 *           description: Email del cliente
 *       required:
 *         - nombre_cliente
 *         - telefono
 *         - email
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente con la información proporcionada.
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
ClienteRouter.post("/", verifyToken, verifyRole(["admin"]), createCliente);

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Obtiene todos los clientes registrados en el sistema.
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Error interno en el servidor
 */
ClienteRouter.get("/", verifyToken, getClientes);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     description: Obtiene los detalles de un cliente mediante su ID.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
ClienteRouter.get("/:id", verifyToken, getCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     description: Actualiza los detalles de un cliente.
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
ClienteRouter.put("/:id", verifyToken, updateCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente mediante su ID.
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
ClienteRouter.delete("/:id", verifyToken, deleteCliente);

export default ClienteRouter;
