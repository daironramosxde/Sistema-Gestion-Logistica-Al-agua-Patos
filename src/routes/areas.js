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
 *         id_area: 1
 *         nombre_area: Recursos Humanos
 */

/**
 * @swagger
 * /areas:
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
router.get("/", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) return res.send(error);
        conexion.query("SELECT * FROM area", (err, areasCo) => {
            if (err) return res.send(err);
            res.json(areasCo);
        });
    });
});

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Registra una nueva área en la Base de Datos
 *     tags: [Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: Nueva área creada en la Base de Datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 */

router.post("/", (req, res)=> {
    req.getConnection((error, conexion) =>{
        if (error) return res.send(error);//console.log(req.body);
        conexion.query("INSERT INTO area SET ?", [req.body], (err,areasCo) => {
            if (err) return res.send(err);
            res.json("<h2>Area agregada con exito</h2>");
        });
    });
});
/*
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

router.delete("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) return res.send(error);
        conexion.query(
            "DELETE FROM area Where codigo = ?",
            [req.params.id],
            (err, areasCo) => {
                if (err) return res.send(err);
                res.json(`<h2>Area eliminada con exito ${[req.params.id]} </h2> ` );
            }
        );
    });
});

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

router.put("/:id", (req, res) =>{
    req.getConnection((error, conexion) =>{
        if (error) return res.send(error);
        conexion.query(
            "UPDATE Area SET ? Where codigo = ?",
            [req.body, req.params.id],
            (err, areasCo) => {
                if (err) return res.send(err);
                res.json("Pieza actualizada con exito");
            }
        );
    });
} );

router.post("/areas", crearArea);
router.get("/areas", obtenerAreas);
router.get("/areas/:id", consultarArea);
router.put("/areas/:id", actualizarArea);
router.delete("/areas/:id", borrarArea);

export default router;
