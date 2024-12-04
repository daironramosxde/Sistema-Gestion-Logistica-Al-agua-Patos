import express from 'express';
import { crearBeneficio, listarBeneficios, consultarBeneficio, modificarBeneficio, borrarBeneficio } from '../controllers/beneficioController.js';
import { createBeneficioSchema, updateBeneficioSchema, getBeneficioByIdSchema, deleteBeneficioSchema } from '../validators/beneficioValidator.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const beneficioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Beneficios
 *   description: Operaciones sobre los beneficios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Beneficio:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del beneficio.
 *         descripcion:
 *           type: string
 *           description: Descripción del beneficio.
 *         id_empleado:
 *           type: string
 *           description: ID del empleado al que se le asigna el beneficio.
 *       required:
 *         - nombre
 *         - descripcion
 *         - id_empleado
 */

/**
 * @swagger
 * /api/beneficios:
 *   post:
 *     summary: Crear un nuevo beneficio
 *     description: Crea un nuevo beneficio para un empleado.
 *     tags: [Beneficios]
 *     security:
 *       - bearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beneficio'  # Referencia al esquema 'Beneficio'
 *     responses:
 *       201:
 *         description: Beneficio creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
beneficioRouter.post('/', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(createBeneficioSchema), crearBeneficio);

/**
 * @swagger
 * /api/beneficios:
 *   get:
 *     summary: Listar todos los beneficios
 *     description: Obtiene la lista de todos los beneficios existentes.
 *     tags: [Beneficios]
 *     responses:
 *       200:
 *         description: Lista de beneficios
 *       500:
 *         description: Error interno en el servidor
 */
beneficioRouter.get('/', verifyToken, verifyRole(['admin', 'asistente']), listarBeneficios);

/**
 * @swagger
 * /api/beneficios/{id_beneficio}:
 *   get:
 *     summary: Obtener un beneficio por ID
 *     description: Obtiene los detalles de un beneficio mediante su ID.
 *     tags: [Beneficios]
 *     parameters:
 *       - in: path
 *         name: id_beneficio
 *         required: true
 *         description: ID del beneficio
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Beneficio encontrado
 *       404:
 *         description: Beneficio no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
beneficioRouter.get('/:id_beneficio', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(getBeneficioByIdSchema), consultarBeneficio);

/**
 * @swagger
 * /api/beneficios/{id_beneficio}:
 *   put:
 *     summary: Actualizar un beneficio
 *     description: Actualiza los detalles de un beneficio. Solo se pueden modificar los campos proporcionados.
 *     tags: [Beneficios]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_beneficio
 *         required: true
 *         description: ID del beneficio
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beneficio'  # Referencia al esquema 'Beneficio'
 *     responses:
 *       200:
 *         description: Beneficio actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Beneficio no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
beneficioRouter.put('/:id_beneficio', verifyToken, verifyRole(['admin', 'asistente']), validatorHandler(updateBeneficioSchema), modificarBeneficio);

/**
 * @swagger
 * /api/beneficios/{id_beneficio}:
 *   delete:
 *     summary: Eliminar un beneficio
 *     description: Elimina un beneficio mediante su ID.
 *     tags: [Beneficios]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id_beneficio
 *         required: true
 *         description: ID del beneficio a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Beneficio eliminado exitosamente
 *       404:
 *         description: Beneficio no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
beneficioRouter.delete('/:id_beneficio', verifyToken, verifyRole(['admin']), validatorHandler(deleteBeneficioSchema), borrarBeneficio);

export default beneficioRouter;
