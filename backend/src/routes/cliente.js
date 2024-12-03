import express from 'express'; // Importa express para crear el enrutador
import { crearCliente, obtenerClientes, obtenerClientePorId, actualizarCliente, borrarCliente } from '../controllers/clienteController.js'; // Importa los controladores
const router = express.Router(); // Crea una instancia de Router

/**
 * @swagger
 * /cliente:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_cliente:
 *                 type: string
 *                 example: Juan Pérez
 *               telefono:
 *                 type: string
 *                 example: 123456789
 *               email:
 *                 type: string
 *                 example: juanperez@example.com
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /cliente:
 *   get:
 *     summary: Obtiene todos los clientes
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
 *                     description: ID del cliente
 *                   nombre_cliente:
 *                     type: string
 *                     description: Nombre del cliente
 *                   telefono:
 *                     type: string
 *                     description: Teléfono del cliente
 *                   email:
 *                     type: string
 *                     description: Email del cliente
 */

/**
 * @swagger
 * /cliente/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del cliente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */

/**
 * @swagger
 * /cliente/{id}:
 *   put:
 *     summary: Actualiza un cliente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del cliente
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
 *               nombre_cliente:
 *                 type: string
 *                 example: Juan Pérez
 *               telefono:
 *                 type: string
 *                 example: 123456789
 *               email:
 *                 type: string
 *                 example: juanperez@example.com
 */

/**
 * @swagger
 * /cliente/{id}:
 *   delete:
 *     summary: Elimina un cliente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del cliente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 */

// Ruta para crear un nuevo cliente
router.post('/cliente', crearCliente); 

// Ruta para obtener todos los clientes
router.get('/cliente', obtenerClientes);

// Ruta para obtener un cliente por ID
router.get('/cliente/:id', obtenerClientePorId);

// Ruta para actualizar un cliente por ID
router.put('/cliente/:id', actualizarCliente);

// Ruta para eliminar un cliente por ID
router.delete('/cliente/:id', borrarCliente);

export default router;
