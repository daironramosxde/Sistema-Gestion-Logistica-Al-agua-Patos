import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import bodyParser from "body-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MONGODB Atlas (WEB)");
  })
  .catch((error) => {
    console.log(`Ocurrió el siguiente error al conectarse == ${error.message}`);
  });

// Configuración de Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api-rol-usuario documentación con Swagger",
      version: "1.0.0",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

const app = express();

app.use(express.json());

// Middleware para manejar datos URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.use("/users", usuarioRoutes);  // Rutas de usuarios
app.use("/rol", rolRoutes);      // Rutas de roles

// Documentación de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));

// Ruta base
app.get('/', (req, res) => {
  res.send('Rol-usuario');
});

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`El servidor se inicia en el puerto ${PORT}`);
});

