import Joi from 'joi';

export const createRecursoSchema = Joi.object({
  id_recurso: Joi.number().required().messages({
    'any.required': 'El ID del recurso es obligatorio.',
    'number.base': 'El ID del recurso debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del recurso es obligatorio.',
    'string.min': 'El nombre del recurso debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del recurso es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),
});

export const getRecursoByIdSchema = Joi.object({
  id_recurso: Joi.number().required().messages({
    'any.required': 'El ID del recurso es obligatorio.',
    'number.base': 'El ID del recurso debe ser un número.',
  }),
});

export const deleteRecursoSchema = Joi.object({
  id_recurso: Joi.number().required().messages({
    'any.required': 'El ID del recurso es obligatorio.',
    'number.base': 'El ID del recurso debe ser un número.',
  }),
});

export const updateRecursoSchema = Joi.object({
  id_recurso: Joi.number().required().messages({
    'any.required': 'El ID del recurso es obligatorio.',
    'number.base': 'El ID del recurso debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del recurso es obligatorio.',
    'string.min': 'El nombre del recurso debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del recurso es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),
});
