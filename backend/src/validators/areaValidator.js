import Joi from 'joi';

export const createAreaSchema = Joi.object({
  id_area: Joi.number().required().messages({
    'any.required': 'El ID del área es obligatorio.',
    'number.base': 'El ID del área debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del área es obligatorio.',
    'string.min': 'El nombre del área debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del área es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),
});

export const getAreaByIdSchema = Joi.object({
  id_area: Joi.number().required().messages({
    'any.required': 'El ID del área es obligatorio.',
    'number.base': 'El ID del área debe ser un número.',
  }),
});

export const deleteAreaSchema = Joi.object({
  id_area: Joi.number().required().messages({
    'any.required': 'El ID del área es obligatorio.',
    'number.base': 'El ID del área debe ser un número.',
  }),
});

export const updateAreaSchema = Joi.object({
  id_area: Joi.number().required().messages({
    'any.required': 'El ID del área es obligatorio.',
    'number.base': 'El ID del área debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del área es obligatorio.',
    'string.min': 'El nombre del área debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del área es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),
});
