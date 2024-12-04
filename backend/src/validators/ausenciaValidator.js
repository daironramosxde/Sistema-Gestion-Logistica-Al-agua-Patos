import Joi from 'joi';

export const createAusenciaSchema = Joi.object({
  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),

  fecha: Joi.date().iso().required().messages({
    'any.required': 'La fecha de la ausencia es obligatoria.',
    'date.base': 'La fecha de la ausencia debe ser válida.',
  }),

  motivo: Joi.string().min(5).required().messages({
    'any.required': 'El motivo de la ausencia es obligatorio.',
    'string.min': 'El motivo debe tener al menos 5 caracteres.',
  }),
});

export const getAusenciaByIdSchema = Joi.object({
  id_ausencia: Joi.number().required().messages({
    'any.required': 'El ID de la ausencia es obligatorio.',
    'number.base': 'El ID de la ausencia debe ser un número.',
  }),
});

export const deleteAusenciaSchema = Joi.object({
  id_ausencia: Joi.number().required().messages({
    'any.required': 'El ID de la ausencia es obligatorio.',
    'number.base': 'El ID de la ausencia debe ser un número.',
  }),
});

export const updateAusenciaSchema = Joi.object({
  id_ausencia: Joi.number().required().messages({
    'any.required': 'El ID de la ausencia es obligatorio.',
    'number.base': 'El ID de la ausencia debe ser un número.',
  }),

  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),

  fecha: Joi.date().iso().required().messages({
    'any.required': 'La fecha de la ausencia es obligatoria.',
    'date.base': 'La fecha de la ausencia debe ser válida.',
  }),

  motivo: Joi.string().min(5).required().messages({
    'any.required': 'El motivo de la ausencia es obligatorio.',
    'string.min': 'El motivo debe tener al menos 5 caracteres.',
  }),
});
