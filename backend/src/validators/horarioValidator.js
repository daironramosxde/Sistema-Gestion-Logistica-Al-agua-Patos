import Joi from 'joi';

export const createHorarioSchema = Joi.object({
  id_horario: Joi.number().required().messages({
    'any.required': 'El ID del horario es obligatorio.',
    'number.base': 'El ID del horario debe ser un número.',
  }),

  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),

  dia_semana: Joi.string().valid('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo').required().messages({
    'any.required': 'El día de la semana es obligatorio.',
    'string.valid': 'El día de la semana debe ser uno de los siguientes: lunes, martes, miércoles, jueves, viernes, sábado, domingo.',
  }),

  hora_entrada: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).required().messages({
    'any.required': 'La hora de entrada es obligatoria.',
    'string.pattern.base': 'La hora de entrada debe tener el formato HH:MM.',
  }),

  hora_salida: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).required().messages({
    'any.required': 'La hora de salida es obligatoria.',
    'string.pattern.base': 'La hora de salida debe tener el formato HH:MM.',
  }),
});

export const getHorarioByIdSchema = Joi.object({
  id_horario: Joi.number().required().messages({
    'any.required': 'El ID del horario es obligatorio.',
    'number.base': 'El ID del horario debe ser un número.',
  }),
});

export const deleteHorarioSchema = Joi.object({
  id_horario: Joi.number().required().messages({
    'any.required': 'El ID del horario es obligatorio.',
    'number.base': 'El ID del horario debe ser un número.',
  }),
});

export const updateHorarioSchema = Joi.object({
  id_horario: Joi.number().required().messages({
    'any.required': 'El ID del horario es obligatorio.',
    'number.base': 'El ID del horario debe ser un número.',
  }),

  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),

  dia_semana: Joi.string().valid('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo').required().messages({
    'any.required': 'El día de la semana es obligatorio.',
    'string.valid': 'El día de la semana debe ser uno de los siguientes: lunes, martes, miércoles, jueves, viernes, sábado, domingo.',
  }),

  hora_entrada: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).required().messages({
    'any.required': 'La hora de entrada es obligatoria.',
    'string.pattern.base': 'La hora de entrada debe tener el formato HH:MM.',
  }),

  hora_salida: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).required().messages({
    'any.required': 'La hora de salida es obligatoria.',
    'string.pattern.base': 'La hora de salida debe tener el formato HH:MM.',
  }),
});
