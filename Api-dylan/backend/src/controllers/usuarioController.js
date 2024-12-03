import userSchema from "../models/Usuario.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
} from "../validators/usuariovalidador.js";

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

export const actualizarUsuario = [
  // Valida los parámetros y el cuerpo de la solicitud
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),

  // Función para actualizar el usuario
  async (req, resp) => {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la URL
    const { nombre, email, password, rol } = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud

    try {
      // Intentar actualizar el usuario con findByIdAndUpdate
      const userUpdate = await userSchema.findByIdAndUpdate(
        id, 
        { $set: { nombre, email, password, rol } },
        { new: true } // Esto devolverá el documento actualizado
      );

      // Verificar si el usuario no fue encontrado
      if (!userUpdate) {
        return resp.status(404).json({ message: "Usuario no encontrado" });
      }

      // Responder con el usuario actualizado
      resp.status(200).json(userUpdate);
    } catch (error) {
      // Manejar cualquier error que ocurra
      resp.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
  },
];

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

