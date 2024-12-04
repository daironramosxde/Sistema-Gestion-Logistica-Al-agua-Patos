import Usuario from '../models/usuario.js';

// Controlador para crear un usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;

    // Crear el usuario
    const nuevoUsuario = new Usuario({ nombre, email, rol });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};

// Controlador para listar todos los usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('rol', 'nombre descripcion');
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

// Controlador para consultar un usuario específico
export const consultarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario por ID
    const usuario = await Usuario.findById(id).populate('rol', 'nombre descripcion');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar usuario', error });
  }
};

// Controlador para modificar un usuario
export const modificarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    // Actualizar el usuario
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, rol },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

// Controlador para borrar un usuario
export const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el usuario
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
};
