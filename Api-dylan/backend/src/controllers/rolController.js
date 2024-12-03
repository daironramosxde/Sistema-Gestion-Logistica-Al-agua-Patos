import rolSchema from "../models/Rol.js"; // Importa el modelo de Rol
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createRolSchema,
  getRolSchema,
  updateRolSchema,
  deleteRolSchema,
} from "../validators/rolvalidador.js";

// Crear un nuevo rol
export const crearRol = [
  validatorHandler(createRolSchema, "body"),
  async (req, res) => {
    const rol = new rolSchema(req.body); // Cambié 'userSchema' por 'rolSchema'
    try {
      const data = await rol.save();
      res.status(201).json(data); // Código de estado 201 para indicar que se creó el recurso
    } catch (error) {
      res.status(500).json({ message: error.message }); // Asegúrate de enviar `error.message` para obtener un mensaje claro
    }
  },
];

// Obtener todos los roles
export const obtenerRoles = async (req, res) => {
  try {
    const roles = await rolSchema.find(); // Buscamos todos los roles
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un rol por ID
export const getRolById = [
  validatorHandler(getRolSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const rol = await rolSchema.findById(id); // Buscamos un rol por ID
      if (!rol) {
        return res.status(404).json({
          message: "Rol no encontrado",
        });
      }
      res.json(rol);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
];

// Actualizar un rol
export const actualizarRol = [
  validatorHandler(getRolSchema, "params"),
  validatorHandler(updateRolSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
      const rolUpdate = await rolSchema.updateOne(
        { _id: id },
        { $set: { nombre, descripcion } }
      );
      if (rolUpdate.matchedCount === 0) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }
      if (rolUpdate.modifiedCount === 0) {
        return res.status(400).json({ message: "No se realizaron cambios" });
      }
      res.status(200).json({ message: "Rol actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Borrar un rol
export const borrarRol = [
  validatorHandler(deleteRolSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await rolSchema.deleteOne({ _id: id }); // Cambié el uso de Promesas
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }
      res.status(200).json({ message: "Rol eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Exporta los controladores
