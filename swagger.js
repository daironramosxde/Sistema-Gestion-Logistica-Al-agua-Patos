import swaggerJSDOC from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// Configuración
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API con conexión a MySQL",
            version: "1.0.0",
            description: "Ejemplo conectando MySQL y separando las rutas",
            contact: {
                name: "API Support",
                email: "supportADS@example.com",
            },
        },
        servers: [
            {
                url: "http://localhost:9000",
                description: "Documentación de mi API Rest Colectionmit"
            },
        ],
    },
    apis: ["./routes/areas.js"],
};

const swaggerSpec = swaggerJSDOC(options);
export const swaggerDocs = (app, PORT) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `Version No 1 de la documentación estará disponible en http://localhost:${PORT}/api-docs`
    );
};
