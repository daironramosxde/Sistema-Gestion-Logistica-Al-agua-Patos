import express from 'express'; // Importa express para crear el enrutador
import { actualizarUsuario, borrarUsuario, crearUsuario, obtenerUsuarios } from '../controllers/usuarioController.js'; // Importa los controladores de usuario
import { validacionUsuario } from '../middlewares/validarDatos.js'; // Importa la validación de usuario
const router = express.Router(); // Crea una instancia de Router

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Dylan"
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: "dyd4G@example.com"
 *               password:
 *                 type: string
 *                 description: Password del usuario
 *                 example: "admin"
 *               rol:
 *                 type: string
 *                 description: Rol del usuario
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
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
 *                     description: ID del usuario
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     description: Email del usuario
 *                   password:
 *                     type: string
 *                     description: Password del usuario
 *                   rol:
 *                     type: string
 *                     description: Rol del usuario
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del usuario
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Email del usuario
 *                 password:
 *                   type: string
 *                   description: Password del usuario
 *                 rol:
 *                   type: string
 *                   description: Rol del usuario
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */

// Ruta para crear un nuevo usuario
router.post('/users', validacionUsuario, crearUsuario); // Colocamos la validación antes del controlador

// Ruta para obtener todos los usuarios
router.get('/users', obtenerUsuarios);

// Ruta para actualizar un usuario por ID
router.put("/users/:id", actualizarUsuario); // La ruta está correcta como "/users/:id"

// Ruta para eliminar un usuario por ID
router.delete("/users/:id", borrarUsuario); // La ruta está correcta como "/users/:id"

// Exporta el enrutador para usarlo en otros archivos
export default router;
