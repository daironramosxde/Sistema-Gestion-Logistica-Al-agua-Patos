import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { port } from './config/conexion.js';
import { swaggerJSDocs } from './swagger.js'; 

import areasRoutes from "./routes/areasRoutes.js";
import ausenciasRoutes from "./routes/ausenciaRouter.js";
import autenticacionRoutes from "./routes/autenticationRoutes.js";
import beneficiosRoutes from "./routes/beneficioRouter.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import empleadosRoutes from "./routes/empleadoRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";
import horariosRoutes from "./routes/horarioRoutes.js";
import recursosRoutes from "./routes/recursoRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";


let corsOptions = {
    origin: '*',
    methods: "GET, POST, OPTIONS, PUT, DELETE",
    optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/areas", areasRoutes);
app.use("/api/ausencias", ausenciasRoutes);
app.use("/api/autenticacion",autenticacionRoutes );
app.use("/api/beneficios", beneficiosRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/horarios", horariosRoutes);
app.use("/api/recursos", recursosRoutes);
app.use("/api/rol", rolRoutes);
app.use("/api/usuarios", usuarioRoutes);


app.get("/", (req, res) => {
    res.send("<h1>Bienvenido al API WEB de SGLAAP</h1>");
});

swaggerJSDocs(app, port);


app.listen(port, () => {
    console.log(`Servidor dentro del puerto ${port}`);
});
