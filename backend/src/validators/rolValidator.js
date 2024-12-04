import Joi from 'joi';

export const createRolSchema = Joi.object({
  id_rol: Joi.number().required().messages({
    'any.required': 'El ID del rol es obligatorio.',
    'number.base': 'El ID del rol debe ser un número.',
  }),

  nombre: Joi.string().valid('Admin', 'Empleado', 'Cliente').required().messages({
    'any.required': 'El nombre del rol es obligatorio.',
    'any.only': 'El nombre debe ser "Admin", "Empleado" o "Cliente".',
  }),
});

export const getRolByIdSchema = Joi.object({
  id_rol: Joi.number().required().messages({
    'any.required': 'El ID del rol es obligatorio.',
    'number.base': 'El ID del rol debe ser un número.',
  }),
});

export const deleteRolSchema = Joi.object({
  id_rol: Joi.number().required().messages({
    'any.required': 'El ID del rol es obligatorio.',
    'number.base': 'El ID del rol debe ser un número.',
  }),
});

export const updateRolSchema = Joi.object({
  id_rol: Joi.number().required().messages({
    'any.required': 'El ID del rol es obligatorio.',
    'number.base': 'El ID del rol debe ser un número.',
  }),

  nombre: Joi.string().valid('Admin', 'Empleado', 'Cliente').required().messages({
    'any.required': 'El nombre del rol es obligatorio.',
    'any.only': 'El nombre debe ser "Admin", "Empleado" o "Cliente".',
  }),
});
