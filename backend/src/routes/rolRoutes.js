import express from 'express'; // Importa express para crear el enrutador
import { actualizarRol, borrarRol, crearRol, obtenerRoles } from '../controllers/rolController.js';
import { validacionRol } from '../middlewares/validarDatos.js'; // Importa las validaciones
const router = express.Router(); // Crea una instancia de Router

/**
 * @swagger
 * /rol:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Administrador
 *               descripcion:
 *                 type: string
 *                 example: Rol de Administrador
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
/**
 * @swagger
 * /rol:
 *   get:
 *     summary: Obtiene todos los roles
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
 *                     description: ID del rol
 *                   nombre:
 *                     type: string
 *                     description: Nombre del rol
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del rol
 */

/**
 * @swagger
 * /rol/{id}:
 *   put:
 *     summary: Actualiza un rol por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
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
 *               nombre:
 *                 type: string
 *                 description: Nombre del rol
 *                 example: "admin"
 */

/**
 * @swagger
 * /rol/{id}:
 *   delete:
 *     summary: Elimina un rol por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 */

// Ruta para crear un nuevo rol
router.post('/rol', validacionRol, crearRol); // Colocamos la validación antes del controlador

// Ruta para obtener todos los roles
router.get('/rol', obtenerRoles);

// Ruta para actualizar un rol por ID
router.put("/rol/:id", actualizarRol); // Corregimos la ruta a "/rol/:id"

// Ruta para eliminar un rol por ID
router.delete("/rol/:id", borrarRol); // Corregimos la ruta a "/rol/:id"

// Exporta el enrutador para usarlo en otros archivos
export default router;