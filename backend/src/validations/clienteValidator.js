import Joi from 'joi';

// Esquema de validación para la creación de un cliente
export const createClienteSchema = Joi.object({
  nombre_cliente: Joi.string().required(),
  telefono: Joi.string().required(),
  email: Joi.string().email().required(),
});

// Esquema de validación para la actualización de un cliente
export const updateClienteSchema = Joi.object({
  nombre_cliente: Joi.string().optional(),
  telefono: Joi.string().optional(),
  email: Joi.string().email().optional(),
});

// Esquema de validación para obtener un cliente por ID
export const getClienteSchema = Joi.object({
  id: Joi.string().required(),
});

// Esquema de validación para borrar un cliente por ID
export const deleteClienteSchema = Joi.object({
  id: Joi.string().required(),
});
