import express from 'express';
import { crearEmpleado, listarEmpleados, consultarEmpleado, modificarEmpleado, borrarEmpleado } from '../controllers/empleadosController.js';
import { createEmpleadoSchema, updateEmpleadoSchema, getEmpleadoByIdSchema, deleteEmpleadoSchema } from '../validators/empleadoValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const empleadoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Operaciones sobre los empleados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del empleado.
 *         apellido:
 *           type: string
 *           description: Apellido del empleado.
 *         correo:
 *           type: string
 *           description: Correo electrónico del empleado.
 *         telefono:
 *           type: string
 *           description: Número de teléfono del empleado.
 *         puesto:
 *           type: string
 *           description: Puesto de trabajo del empleado.
 *       required:
 *         - nombre
 *         - apellido
 *         - correo
 *         - telefono
 *         - puesto
 */

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     description: Crea un nuevo empleado en la base de datos.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'  # Referencia al esquema 'Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
empleadoRouter.post('/', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(createEmpleadoSchema), crearEmpleado);

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Listar todos los empleados
 *     description: Obtiene la lista de todos los empleados existentes.
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *       500:
 *         description: Error interno en el servidor
 */
empleadoRouter.get('/', verifyToken, verifyRole(['admin', 'asistente']), listarEmpleados);

/**
 * @swagger
 * /api/empleados/{id_empleado}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     description: Obtiene los detalles de un empleado mediante su ID.
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id_empleado
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
empleadoRouter.get('/:id_empleado', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(getEmpleadoByIdSchema), consultarEmpleado);

/**
 * @swagger
 * /api/empleados/{id_empleado}:
 *   put:
 *     summary: Actualizar un empleado
 *     description: Actualiza los detalles de un empleado. Solo se pueden modificar los campos proporcionados.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_empleado
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'  # Referencia al esquema 'Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
empleadoRouter.put('/:id_empleado', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(updateEmpleadoSchema), modificarEmpleado);

/**
 * @swagger
 * /api/empleados/{id_empleado}:
 *   delete:
 *     summary: Eliminar un empleado
 *     description: Elimina un empleado mediante su ID.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_empleado
 *         required: true
 *         description: ID del empleado a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
empleadoRouter.delete('/:id_empleado', verifyToken, verifyRole(['admin']), validatorHandler(deleteEmpleadoSchema), borrarEmpleado);

export default empleadoRouter;
