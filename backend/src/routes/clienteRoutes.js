import express from 'express';
import { crearCliente, listarClientes, consultarCliente, modificarCliente, borrarCliente } from '../controllers/clienteController.js';
import { createClienteSchema, updateClienteSchema, getClienteByIdSchema, deleteClienteSchema } from '../validators/clienteValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const clienteRouter = express.Router();

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
 *         nombre:
 *           type: string
 *           description: Nombre del cliente.
 *         apellido:
 *           type: string
 *           description: Apellido del cliente.
 *         correo:
 *           type: string
 *           description: Correo electrónico del cliente.
 *         telefono:
 *           type: string
 *           description: Número de teléfono del cliente.
 *       required:
 *         - nombre
 *         - apellido
 *         - correo
 *         - telefono
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente en la base de datos.
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'  # Referencia al esquema 'Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
clienteRouter.post('/', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(createClienteSchema), crearCliente);

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Listar todos los clientes
 *     description: Obtiene la lista de todos los clientes existentes.
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Error interno en el servidor
 */
clienteRouter.get('/', verifyToken, verifyRole(['admin', 'asistente']), listarClientes);

/**
 * @swagger
 * /api/clientes/{id_cliente}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     description: Obtiene los detalles de un cliente mediante su ID.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id_cliente
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
clienteRouter.get('/:id_cliente', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(getClienteByIdSchema), consultarCliente);

/**
 * @swagger
 * /api/clientes/{id_cliente}:
 *   put:
 *     summary: Actualizar un cliente
 *     description: Actualiza los detalles de un cliente. Solo se pueden modificar los campos proporcionados.
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_cliente
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'  # Referencia al esquema 'Cliente'
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
clienteRouter.put('/:id_cliente', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(updateClienteSchema), modificarCliente);

/**
 * @swagger
 * /api/clientes/{id_cliente}:
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente mediante su ID.
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_cliente
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
clienteRouter.delete('/:id_cliente', verifyToken, verifyRole(['admin']), validatorHandler(deleteClienteSchema), borrarCliente);

export default clienteRouter;
