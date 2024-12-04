import express from 'express';
import Login from '../controllers/autenticationController.js';

const AutenticacionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Operaciones relacionadas con la autenticación de usuarios.
 */

/** 
 * @swagger
 * /api/autenticacion:
 *   post:
 *     summary: Realiza y permite, la autenticación del usuario
 *     description: Permite al usuario autenticarse usando como parametros email y password.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario a autenticar.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario a autenticar.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticación exitosa, se devuelve un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para el acceso a la API.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error de validación, los campos email o password no están correctos.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno en el servidor.
 */

AutenticacionRouter.post('/', Login);

export default AutenticacionRouter;
