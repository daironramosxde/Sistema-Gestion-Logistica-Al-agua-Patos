import express from "express";

import { crearArea, obtenerAreas, consultarArea, actualizarArea, borrarArea } from "../controllers/controladorArea.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       properties:
 *         id_area:
 *           type: integer
 *           description: Id autogenerado en la Base de Datos
 *         nombre_area:
 *           type: string
 *           description: Nombre del área
 *       required:
 *         - nombre_area
 *       example:
 *         nombre_area: Recursos Humanos
 */

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Registra una nueva área en la Base de Datos
 *     tags: [areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/area'
 *     responses:
 *       200:
 *         description: Nueva área creada en la Base de Datos
 *         
 *   
 */


/** 
* @swagger
* /areas/{id}:
*   delete:
*     summary: Elimina un área de la Base de Datos
*     tags: [Areas]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: ID del área a eliminar
*     responses:
*       200:
*         description: Área eliminada exitosamente
*         content:
*           application/json:
*             schema:
*               type: object
*                          
*       404:
*         description: No se encontró el área
*/


/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Retorna los registros de la entidad Áreas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: Esta es la lista de las Áreas en la Base de Datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 */



/**
 * @swagger
 * /areas/{id}:
 *   put:
 *     summary: Actualiza un área existente en la Base de Datos
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: Área actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       404:
 *         description: No se encontró el área
 */


router.post("/areas", crearArea);
router.get("/areas", obtenerAreas);
router.get("/areas/:id", consultarArea);
router.put("/areas/:id", actualizarArea);
router.delete("/areas/:id", borrarArea);

export default router;
