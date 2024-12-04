import Joi from 'joi';

export const createClienteSchema = Joi.object({
  id_cliente: Joi.number().required().messages({
    'any.required': 'El ID del cliente es obligatorio.',
    'number.base': 'El ID del cliente debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del cliente es obligatorio.',
    'string.min': 'El nombre del cliente debe tener al menos 3 caracteres.',
  }),

  correo: Joi.string().email().required().messages({
    'any.required': 'El correo del cliente es obligatorio.',
    'string.email': 'El correo debe ser válido.',
  }),

  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'any.required': 'El número de teléfono es obligatorio.',
    'string.pattern.base': 'El número de teléfono debe tener 10 dígitos.',
  }),
});

export const getClienteByIdSchema = Joi.object({
  id_cliente: Joi.number().required().messages({
    'any.required': 'El ID del cliente es obligatorio.',
    'number.base': 'El ID del cliente debe ser un número.',
  }),
});

export const deleteClienteSchema = Joi.object({
  id_cliente: Joi.number().required().messages({
    'any.required': 'El ID del cliente es obligatorio.',
    'number.base': 'El ID del cliente debe ser un número.',
  }),
});

export const updateClienteSchema = Joi.object({
  id_cliente: Joi.number().required().messages({
    'any.required': 'El ID del cliente es obligatorio.',
    'number.base': 'El ID del cliente debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del cliente es obligatorio.',
    'string.min': 'El nombre del cliente debe tener al menos 3 caracteres.',
  }),

  correo: Joi.string().email().required().messages({
    'any.required': 'El correo del cliente es obligatorio.',
    'string.email': 'El correo debe ser válido.',
  }),

  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'any.required': 'El número de teléfono es obligatorio.',
    'string.pattern.base': 'El número de teléfono debe tener 10 dígitos.',
  }),
});
