import Joi from 'joi';

export const createUsuarioSchema = Joi.object({
  id_usuario: Joi.number().required().messages({
    'any.required': 'El ID del usuario es obligatorio.',
    'number.base': 'El ID del usuario debe ser un número.',
  }),

  nombre_usuario: Joi.string().min(3).required().messages({
    'any.required': 'El nombre de usuario es obligatorio.',
    'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
  }),

  contraseña: Joi.string().min(6).required().messages({
    'any.required': 'La contraseña es obligatoria.',
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
  }),

  correo: Joi.string().email().required().messages({
    'any.required': 'El correo del usuario es obligatorio.',
    'string.email': 'El correo debe ser válido.',
  }),

  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'any.required': 'El número de teléfono es obligatorio.',
    'string.pattern.base': 'El número de teléfono debe tener 10 dígitos.',
  }),
});

export const getUsuarioByIdSchema = Joi.object({
  id_usuario: Joi.number().required().messages({
    'any.required': 'El ID del usuario es obligatorio.',
    'number.base': 'El ID del usuario debe ser un número.',
  }),
});

export const deleteUsuarioSchema = Joi.object({
  id_usuario: Joi.number().required().messages({
    'any.required': 'El ID del usuario es obligatorio.',
    'number.base': 'El ID del usuario debe ser un número.',
  }),
});

export const updateUsuarioSchema = Joi.object({
  id_usuario: Joi.number().required().messages({
    'any.required': 'El ID del usuario es obligatorio.',
    'number.base': 'El ID del usuario debe ser un número.',
  }),

  nombre_usuario: Joi.string().min(3).required().messages({
    'any.required': 'El nombre de usuario es obligatorio.',
    'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
  }),

  contraseña: Joi.string().min(6).required().messages({
    'any.required': 'La contraseña es obligatoria.',
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
  }),

  correo: Joi.string().email().required().messages({
    'any.required': 'El correo del usuario es obligatorio.',
    'string.email': 'El correo debe ser válido.',
  }),

  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'any.required': 'El número de teléfono es obligatorio.',
    'string.pattern.base': 'El número de teléfono debe tener 10 dígitos.',
  }),
});
