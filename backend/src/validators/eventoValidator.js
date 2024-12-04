import Joi from 'joi';

export const createEventoSchema = Joi.object({
  id_evento: Joi.number().required().messages({
    'any.required': 'El ID del evento es obligatorio.',
    'number.base': 'El ID del evento debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del evento es obligatorio.',
    'string.min': 'El nombre del evento debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del evento es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),

  fecha_inicio: Joi.date().iso().required().messages({
    'any.required': 'La fecha de inicio del evento es obligatoria.',
    'date.base': 'La fecha de inicio debe ser válida.',
  }),

  fecha_fin: Joi.date().iso().greater(Joi.ref('fecha_inicio')).required().messages({
    'any.required': 'La fecha de fin del evento es obligatoria.',
    'date.base': 'La fecha de fin debe ser válida.',
    'date.greater': 'La fecha de fin debe ser posterior a la fecha de inicio.',
  }),
});

export const getEventoByIdSchema = Joi.object({
  id_evento: Joi.number().required().messages({
    'any.required': 'El ID del evento es obligatorio.',
    'number.base': 'El ID del evento debe ser un número.',
  }),
});

export const deleteEventoSchema = Joi.object({
  id_evento: Joi.number().required().messages({
    'any.required': 'El ID del evento es obligatorio.',
    'number.base': 'El ID del evento debe ser un número.',
  }),
});

export const updateEventoSchema = Joi.object({
  id_evento: Joi.number().required().messages({
    'any.required': 'El ID del evento es obligatorio.',
    'number.base': 'El ID del evento debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del evento es obligatorio.',
    'string.min': 'El nombre del evento debe tener al menos 3 caracteres.',
  }),

  descripcion: Joi.string().min(5).required().messages({
    'any.required': 'La descripción del evento es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
  }),

  fecha_inicio: Joi.date().iso().required().messages({
    'any.required': 'La fecha de inicio del evento es obligatoria.',
    'date.base': 'La fecha de inicio debe ser válida.',
  }),

  fecha_fin: Joi.date().iso().greater(Joi.ref('fecha_inicio')).required().messages({
    'any.required': 'La fecha de fin del evento es obligatoria.',
    'date.base': 'La fecha de fin debe ser válida.',
    'date.greater': 'La fecha de fin debe ser posterior a la fecha de inicio.',
  }),
});
