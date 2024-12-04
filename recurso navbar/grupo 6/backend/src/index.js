// index.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import conectarBD from "./config/conexion.js";
import areasRoutes from "./routes/areas.js";
import recursosRoutes from "./routes/recursos.js";  // Agregar esta línea
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Configurar __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:9000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const app = express();

app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.use("/api", areasRoutes);
app.use("/api", recursosRoutes);  // Agregar esta línea para las rutas de recursos
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

var corsOptions = {
    // origin: 'http://localhost:9000',
    origin: '*',
    method: "GET, POST, OPTIONS, PUT, DELETE",
    optionsSuccessStatus: 200,
}

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("<h1>Bienvenido al API WEB de Áreas y Recursos</h1>");
});

// Conectar a la BD y escuchar en el puerto
conectarBD();
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
