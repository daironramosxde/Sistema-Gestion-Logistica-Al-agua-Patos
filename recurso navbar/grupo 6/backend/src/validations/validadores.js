const probarValidacion = (schema, data) => {
    const { error, value } = schema.validate(data);
    if (error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log("Validación exitosa:", value);
    }
  };
  
  // Pruebas para createAreaSchema
  console.log("Prueba createAreaSchema:");
  probarValidacion(createAreaSchema, { nombre_area: "Recursos Humanos" }); // Prueba válida
  probarValidacion(createAreaSchema, { nombre_area: "R" }); // Prueba inválida (muy corta)
  probarValidacion(createAreaSchema, {}); // Prueba inválida (campo requerido ausente)
  
  // Pruebas para updateAreaSchema
  console.log("Prueba updateAreaSchema:");
  probarValidacion(updateAreaSchema, { id_area: "60d0fe4f5311236168a109ca", nombre_area: "Ventas" }); // Prueba válida
  probarValidacion(updateAreaSchema, { id_area: "123", nombre_area: "Ventas" }); // Prueba inválida (ID incorrecto)
  probarValidacion(updateAreaSchema, { id_area: "60d0fe4f5311236168a109ca" }); // Prueba inválida (nombre_area ausente)
  
  // Pruebas para getAreaSchema
  console.log("Prueba getAreaSchema:");
  probarValidacion(getAreaSchema, { id_area: "60d0fe4f5311236168a109ca" }); // Prueba válida
  probarValidacion(getAreaSchema, { id_area: "123" }); // Prueba inválida (ID incorrecto)
  
  // Pruebas para deleteAreaSchema
  console.log("Prueba deleteAreaSchema:");
  probarValidacion(deleteAreaSchema, { id_area: "60d0fe4f5311236168a109ca" }); // Prueba válida
  probarValidacion(deleteAreaSchema, { id_area: "123" }); // Prueba inválida (ID incorrecto)
  