import Joi from 'joi';

// Definimos el patrón para la validación del ID
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

// Definimos la validación para el campo nombre
const nombre = Joi.string()
  .min(3)
  .max(30) // Unificamos a 30 caracteres para coherencia
  .required()
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El nombre no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede exceder los 30 caracteres.",
    "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    "any.required": "El nombre es un campo requerido.",
  });

// Definimos la validación para el campo descripción
const descripcion = Joi.string().max(255).optional().messages({
  "string.base": "La descripción debe ser un texto.",
  "string.max": "La descripción no puede superar los 255 caracteres.",
});

// Esquema para crear un nuevo rol
export const createRolSchema = Joi.object({
  nombre: nombre, // Usamos el validador de nombre ya definido
  descripcion: descripcion, // Descripción es opcional
});

// Esquema para actualizar un rol
const updateRolSchema = Joi.object({
  nombre: nombre.required(), // Nombre requerido
  descripcion: descripcion.optional(), // Descripción opcional
});

// Esquema para obtener un rol por ID
const getRolSchema = Joi.object({
  id: id.required(), // ID requerido
});

// Esquema para borrar un rol por ID
const deleteRolSchema = Joi.object({
  id: id.required(), // ID requerido
});

export { updateRolSchema, getRolSchema, deleteRolSchema };
