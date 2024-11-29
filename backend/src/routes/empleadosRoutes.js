import express from "express";
import {
  obtenerEmpleados,
  crearEmpleado,
  consultarEmpleado,
  actualizarEmpleado,
  borrarEmpleado,
} from "../controllers/empleadosController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado del empleado
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *         correo:
 *           type: string
 *           description: Correo electrónico del empleado
 *         telefono:
 *           type: string
 *           description: Teléfono del empleado
 *         cargo:
 *           type: string
 *           description: Cargo del empleado
 *       required:
 *         - nombre
 *         - correo
 *         - telefono
 *         - cargo
 *       example:
 *         nombre: Juan Pérez
 *         correo: juan.perez@example.com
 *         telefono: "123456789"
 *         cargo: Gerente
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtiene la lista de empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 */
router.get("/empleados", obtenerEmpleados);

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 */
router.post("/empleados", crearEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Consulta un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado a consultar
 *     responses:
 *       200:
 *         description: Información del empleado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 */
router.get("/empleados/:id", consultarEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: Actualiza un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 */
router.put("/empleados/:id", actualizarEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Elimina un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 */
router.delete("/empleados/:id", borrarEmpleado);

export default router;
