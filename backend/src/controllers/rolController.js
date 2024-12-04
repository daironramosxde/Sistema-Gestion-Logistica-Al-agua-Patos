import Rol from '../models/rol.js';

// Controlador para crear un rol
export const crearRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Crear el rol
    const nuevoRol = new Rol({ nombre, descripcion });
    await nuevoRol.save();
    res.status(201).json({ mensaje: 'Rol creado', rol: nuevoRol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear rol', error });
  }
};

// Controlador para listar todos los roles
export const listarRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener roles', error });
  }
};

// Controlador para consultar un rol específico
export const consultarRol = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el rol por ID
    const rol = await Rol.findById(id);
    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    res.status(200).json(rol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar rol', error });
  }
};

// Controlador para modificar un rol
export const modificarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    // Actualizar el rol
    const rolActualizado = await Rol.findByIdAndUpdate(
      id,
      { nombre, descripcion },
      { new: true }
    );

    if (!rolActualizado) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    res.status(200).json({ mensaje: 'Rol actualizado', rol: rolActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar rol', error });
  }
};

// Controlador para borrar un rol
export const borrarRol = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el rol
    const rolEliminado = await Rol.findByIdAndDelete(id);
    if (!rolEliminado) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    res.status(200).json({ mensaje: 'Rol eliminado', rol: rolEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar rol', error });
  }
};
