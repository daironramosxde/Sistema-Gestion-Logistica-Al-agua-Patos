import Joi from 'joi';

export const createBeneficioSchema = Joi.object({
  id_beneficio: Joi.number().required().messages({
    'any.required': 'El ID del beneficio es obligatorio.',
    'number.base': 'El ID del beneficio debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del beneficio es obligatorio.',
    'string.min': 'El nombre del beneficio debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del beneficio es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),
});

export const getBeneficioByIdSchema = Joi.object({
  id_beneficio: Joi.number().required().messages({
    'any.required': 'El ID del beneficio es obligatorio.',
    'number.base': 'El ID del beneficio debe ser un número.',
  }),
});

export const deleteBeneficioSchema = Joi.object({
  id_beneficio: Joi.number().required().messages({
    'any.required': 'El ID del beneficio es obligatorio.',
    'number.base': 'El ID del beneficio debe ser un número.',
  }),
});

export const updateBeneficioSchema = Joi.object({
  id_beneficio: Joi.number().required().messages({
    'any.required': 'El ID del beneficio es obligatorio.',
    'number.base': 'El ID del beneficio debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del beneficio es obligatorio.',
    'string.min': 'El nombre del beneficio debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del beneficio es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),
});
