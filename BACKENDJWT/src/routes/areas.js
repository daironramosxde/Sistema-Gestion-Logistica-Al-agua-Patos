import express from "express";

import { createArea, getArea, consultArea, updateArea, deleteArea } from "../controllers/controladorArea.js";
import { createAreaSchema, updateAreaSchema, getAreaSchema } from '../validations/validadores.js';
import { validatorHandler } from '../middlewares/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middlewares/Autentication.js'; 

const AreaRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       properties:
 *         id_area:
 *           type: integer
 *           description: Identificador único del área.
 *         nombre_area:
 *           type: string
 *           description: Nombre del área.
 *         telefono:
 *           type: string
 *           description: Teléfono del área.
 *         email:
 *           type: string
 *           description: Correo electrónico del área.
 *       required:
 *         - id_area
 *         - nombre_area
 *         - telefono
 *         - email
 */

/**
 * @swagger
 * /api/areas:
 *   post:
 *     summary: Crear una nueva área
 *     description: Crea una nueva área con la información proporcionada.
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
*     parameters:
 *       - in: path
 *         name: numero_idarea
 *         required: true
 *         description: Número de identificación de la Areanpm 
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'  # Referencia al esquema 'Area'
 *     responses:
 *       201:
 *         description: Área creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
AreaRouter.post('/', verifyToken, verifyRole(['admin']), validatorHandler(createAreaSchema), createArea);

/**
 * @swagger
 * /api/areas/{id_area}:
 *   get:
 *     summary: Obtener un área por ID
 *     description: Obtiene los detalles de un área mediante su identificador único.
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: Identificador único del área
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Área encontrada
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
AreaRouter.get('/:id_area', verifyToken, verifyRole(['admin']), validatorHandler(getAreaSchema), getArea);

/**
 * @swagger
 * /api/areas/{id_area}:
 *   put:
 *     summary: Actualizar un área
 *     description: Actualiza los detalles de un área. Solo se pueden modificar los campos proporcionados.
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: Identificador único del área
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'  # Referencia al esquema 'Area'
 *     responses:
 *       200:
 *         description: Área actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
AreaRouter.put('/:id_area', verifyToken, verifyRole(['admin']), validatorHandler(updateAreaSchema), updateArea);

/**
 * @swagger
 * /api/areas/{id_area}:
 *   delete:
 *     summary: Eliminar un área
 *     description: Elimina un área mediante su identificador único.
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: Identificador único del área que se desea eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Área eliminada exitosamente
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
AreaRouter.delete('/:id_area', verifyToken, verifyRole(['admin']), validatorHandler(getAreaSchema), deleteArea);

/**
 * @swagger
 * /api/areas/{id_area}/consult:
 *   get:
 *     summary: Consultar un área por ID
 *     description: Realiza una consulta de un área con información adicional.
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id_area
 *         required: true
 *         description: Identificador único del área a consultar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del área consultada
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
AreaRouter.get('/:id_area/consult', verifyToken, verifyRole(['admin']), validatorHandler(getAreaSchema), consultArea);
export default AreaRouter;
