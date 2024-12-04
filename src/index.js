import express from "express";
import dotenv from "dotenv";
import conectarBD from "./config/conexion.js";
import areasRoutes from "./routes/areas.js"; 
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("<h1>Bienvenido al API WEB de Áreas</h1>");
});

// Usa las rutas de `areas`
app.use("/api", areasRoutes);

// Conectar a la BD y escuchar en el puerto
conectarBD();
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    
});
