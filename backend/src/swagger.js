import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API con conexión a MongoDB',
      version: '1.0.0',
      description: 'Ejemplo de API con MongoDB para gestionar usuarios, abogados, asistentes, clientes, roles y facturas',
      contact: {
        name: 'API Support',
        email: 'supportADSO@example.com',
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        }
      },
    },
    security: [
      { BearerAuth: [] },
    ],
  },
  apis: [
    './src/routes/areasRoutes.js',
    './src/routes/ausenciaRouter.js',
    './src/routes/autenticationRoutes.js',
    './src/routes/beneficioRouter.js',
    './src/routes/clienteRoutes.js',
    './src/routes/empleadoRoutes.js',
    './src/routes/eventoRoutes.js',
    './src/routes/horarioRoutes.js',
    './src/routes/rolRoutes.js',
    './src/routes/recursoRoutes.js',
    './src/routes/usuarioRoutes.js',
  ]
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerJSDocs = (app, port) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(
    ` documentación en http://localhost:${port}/api-docs`
  );
};

export { swaggerJSDocs };
