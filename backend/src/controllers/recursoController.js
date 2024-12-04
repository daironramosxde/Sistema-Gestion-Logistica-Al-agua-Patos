import Recurso from '../models/recurso.js';

// Controlador para crear un recurso
export const crearRecurso = async (req, res) => {
  try {
    const { nombre_recurso, cantidad, ubicacion } = req.body;

    // Crear el recurso
    const nuevoRecurso = new Recurso({ nombre_recurso, cantidad, ubicacion });
    await nuevoRecurso.save();
    res.status(201).json({ mensaje: 'Recurso creado', recurso: nuevoRecurso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear recurso', error });
  }
};

// Controlador para listar todos los recursos
export const listarRecursos = async (req, res) => {
  try {
    const recursos = await Recurso.find();
    res.status(200).json(recursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener recursos', error });
  }
};

// Controlador para consultar un recurso específico
export const consultarRecurso = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el recurso por ID
    const recurso = await Recurso.findById(id);
    if (!recurso) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }

    res.status(200).json(recurso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar recurso', error });
  }
};

// Controlador para modificar un recurso
export const modificarRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_recurso, cantidad, ubicacion } = req.body;

    // Actualizar el recurso
    const recursoActualizado = await Recurso.findByIdAndUpdate(
      id,
      { nombre_recurso, cantidad, ubicacion },
      { new: true }
    );

    if (!recursoActualizado) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }

    res.status(200).json({ mensaje: 'Recurso actualizado', recurso: recursoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar recurso', error });
  }
};

// Controlador para borrar un recurso
export const borrarRecurso = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el recurso
    const recursoEliminado = await Recurso.findByIdAndDelete(id);
    if (!recursoEliminado) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }

    res.status(200).json({ mensaje: 'Recurso eliminado', recurso: recursoEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar recurso', error });
  }
};
