import express from "express";
import {createEmpleado,getEmpleados,consultEmpleado,updateEmpleado,deleteEmpleado} from "../controllers/empleadosController.js";
import { validatorHandler } from "../middlewares/validator.handler.js";
import { verifyToken, verifyRole } from "../middlewares/Autentication.js"; // Suponiendo que ya tienes esta configuración para autenticar y verificar roles

const EmpleadoRouter = express.Router();

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
 *           description: Nombre del empleado
 *         correo:
 *           type: string
 *           description: Correo electrónico del empleado
 *         telefono:
 *           type: string
 *           description: Teléfono del empleado
 *         id_area:
 *           type: string
 *           description: ID del área en la que trabaja el empleado
 *       required:
 *         - nombre
 *         - correo
 *         - telefono
 *         - id_area
 */

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     description: Crea un nuevo empleado con la información proporcionada.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
EmpleadoRouter.post("/", verifyToken, verifyRole(["admin"]), createEmpleado);

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     description: Obtiene todos los empleados con información adicional del área.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados
 *       500:
 *         description: Error interno en el servidor
 */
EmpleadoRouter.get("/", verifyToken, getEmpleados);

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Consultar un empleado por ID
 *     description: Obtiene los detalles de un empleado mediante su ID.
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
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
EmpleadoRouter.get("/:id", verifyToken, consultEmpleado);

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     description: Actualiza los detalles de un empleado.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
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
EmpleadoRouter.put("/:id", verifyToken, updateEmpleado);

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     description: Elimina un empleado mediante su identificador único.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
EmpleadoRouter.delete("/:id", verifyToken, deleteEmpleado);

export default EmpleadoRouter;
