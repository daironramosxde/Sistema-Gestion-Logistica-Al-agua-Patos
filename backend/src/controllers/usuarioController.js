import { validatorHandler } from "../middlewares/validator.handler.js";
import userSchema from "../models/Usuario.js";
import {
    createUserSchema,
    deleteUserSchema,
    getUserSchema,
    updateUserSchema,
} from "../validations/usuariovalidador.js";

//   res.send("Esta ruta esta pensada para crear un usuario nuevo");
export const crearUsuario = [
  validatorHandler(createUserSchema, "body"),
  async (req, res) => {
    const user = new userSchema(req.body);
    await user
      .save()
      .then((data) => res.status(201).json(data)) // Cambio el código de estado a 201 para indicar que se creó un nuevo recurso
      .catch((error) => res.status(500).json({ message: error.message })); // Asegúrate de enviar `error.message` para obtener un mensaje más claro
  },
];

export const obtenerUsuarios = (req, resp) => {
  userSchema
    .find() //Metodo usado para buscar todos los docs de una coleccion
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const getUserById = [
  validatorHandler(getUserSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const user = await userSchema.findById(id); //Metodo usado para buscar un documento de una coleccion
      if (!user) {
        return resp.status(404).json({
          message: "Usuario no encontrado",
        });
      }
      resp.json(user);
    } catch (error) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

import Usuario from '../models/Usuario.js';

export const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;

    // Verificar que los campos requeridos no estén vacíos
    if (!nombre || !email || !rol) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, rol },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario." });
  }
};

export const borrarUsuario = [
  validatorHandler(deleteUserSchema, "params"),

  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = await userSchema.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        resp.status(404).json({ message: "Usuario no encontrado" });
      }
      resp.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

