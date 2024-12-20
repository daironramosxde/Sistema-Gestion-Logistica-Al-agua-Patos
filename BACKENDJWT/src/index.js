// index.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


import conectarBD from "./config/conexion.js";
import empleadosRoutes from "./routes/empleadosRoutes.js";
import areasRoutes from "./routes/areas.js";
import ausenciasRoutes from "./routes/ausencias.js"
import recursosRoutes from "./routes/recursos.js"; // Rutas de recursos


// Configurar __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// swagger


const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Áreas y Recursos",
            version: "1.0.0",
            description: "Documentación de la API para gestionar áreas y recursos",
        },
        servers: [
            {
                url: "http://localhost:9000",
                description: "Servidor local",
            },
        ],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`], // Incluir rutas para documentación
};

const app = express();

app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.use("/api", empleadosRoutes);
app.use("/api", areasRoutes);
app.use("/api", ausenciasRoutes);
app.use("/api", recursosRoutes); // Rutas de recursos
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

let corsOptions = {
    origin: '*',
    methods: "GET, POST, OPTIONS, PUT, DELETE",
    optionsSuccessStatus: 200,
};

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
