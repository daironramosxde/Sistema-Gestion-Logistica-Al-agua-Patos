// validadores.js

import Joi from 'joi';

// Esquema para la creación de un área
export const createAreaSchema = Joi.object({
  nombre_area: Joi.string().max(50).required()  // El nombre del área es obligatorio y debe tener un máximo de 50 caracteres
});

// Esquema para la actualización de un área
export const updateAreaSchema = Joi.object({
  id_area: Joi.string().length(24).required(),  // El ID del área es obligatorio y debe ser un string de 24 caracteres (si usas MongoDB, por ejemplo)
  nombre_area: Joi.string().max(50).optional()  // El nombre del área es opcional, pero si se proporciona, debe tener un máximo de 50 caracteres
});

// Esquema para obtener un área por ID
export const getAreaSchema = Joi.object({
  id_area: Joi.string().length(24).required()  // El ID del área es obligatorio y debe ser un string de 24 caracteres
});

// Esquema para eliminar un área por ID
export const deleteAreaSchema = Joi.object({
  id_area: Joi.string().length(24).required()  // El ID del área es obligatorio y debe ser un string de 24 caracteres
});
