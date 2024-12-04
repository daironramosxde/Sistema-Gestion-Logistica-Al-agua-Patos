import Joi from 'joi';

export const createEmpleadoSchema = Joi.object({
  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del empleado es obligatorio.',
    'string.min': 'El nombre del empleado debe tener al menos 3 caracteres.',
  }),

  cargo: Joi.string().min(3).required().messages({
    'any.required': 'El cargo del empleado es obligatorio.',
    'string.min': 'El cargo debe tener al menos 3 caracteres.',
  }),

  correo: Joi.string().email().required().messages({
    'any.required': 'El correo del empleado es obligatorio.',
    'string.email': 'El correo debe ser válido.',
  }),

  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'any.required': 'El número de teléfono es obligatorio.',
    'string.pattern.base': 'El número de teléfono debe tener 10 dígitos.',
  }),

  salario: Joi.number().required().messages({
    'any.required': 'El salario del empleado es obligatorio.',
    'number.base': 'El salario debe ser un número.',
  }),
});

export const getEmpleadoByIdSchema = Joi.object({
  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),
});

export const deleteEmpleadoSchema = Joi.object({
  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),
});

export const updateEmpleadoSchema = Joi.object({
  id_empleado: Joi.number().required().messages({
    'any.required': 'El ID del empleado es obligatorio.',
    'number.base': 'El ID del empleado debe ser un número.',
  }),

  nombre: Joi.string().min(3).required().messages({
    'any.required': 'El nombre del empleado es obligatorio.',
    'string.min': 'El nombre del empleado debe tener al menos 3 caracteres.',
  }),

  cargo: Joi.string().min(3).required().messages({
    'any.required': 'El cargo del empleado es obligatorio.',
    'string.min': 'El cargo debe tener al menos 3 caracteres.',
  }),

  correo: Joi.string().email().required().messages({
    'any.required': 'El correo del empleado es obligatorio.',
    'string.email': 'El correo debe ser válido.',
  }),

  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'any.required': 'El número de teléfono es obligatorio.',
    'string.pattern.base': 'El número de teléfono debe tener 10 dígitos.',
  }),

  salario: Joi.number().required().messages({
    'any.required': 'El salario del empleado es obligatorio.',
    'number.base': 'El salario debe ser un número.',
  }),
});
