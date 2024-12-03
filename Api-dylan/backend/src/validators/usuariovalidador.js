import Joi from "joi";

// Creamos las validaciones para cada campo

const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

  

const nombre = Joi.string()
  .min(3)
  .max(90)
  .required()
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede exceder los 90 caracteres.",
    "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    "any.required": "El nombre es un campo requerido",
  });

// Validación para el campo email (según el modelo)
const email = Joi.string()
  .email()
  .required()
  .messages({
    "string.email": "El campo email debe ser un correo electrónico válido.",
    "any.required": "El campo email es requerido.",
  });

// Validación para el campo password (según el modelo)
const password = Joi.string()
  .min(6)
  .required()
  .messages({
    "string.base": "El password debe ser un texto",
    "string.empty": "El password no puede estar vacío.",
    "string.min": "El password debe tener al menos 6 caracteres.",
    "any.required": "El campo password es requerido.",
  });

// Validación para el campo rol (según el modelo)
const rol = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "El campo rol debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo rol es requerido.",
  });

// Ahora creamos las validaciones para los métodos de la lógica

const createUserSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
  password: password.required(),
  rol: rol.required(),
});

const updateUserSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
  password: password.required(),
  rol: rol.required(),
});



const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema };

