import Ausencia from '../models/ausencia.js';
import Empleado from '../models/empleado.js';

// Controlador para registrar una ausencia
export const crearAusencia = async (req, res) => {
  try {
    const { id_empleado, fecha, motivo } = req.body;

    // Verificar si el empleado existe
    const empleado = await Empleado.findById(id_empleado);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    // Crear y guardar la ausencia
    const nuevaAusencia = new Ausencia({ id_empleado, fecha, motivo });
    await nuevaAusencia.save();
    res.status(201).json({ mensaje: 'Ausencia registrada', ausencia: nuevaAusencia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar ausencia', error });
  }
};

// Controlador para listar todas las ausencias
export const listarAusencias = async (req, res) => {
  try {
    const ausencias = await Ausencia.find().populate('id_empleado', 'nombre correo cargo');
    res.status(200).json(ausencias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener ausencias', error });
  }
};

// Controlador para consultar una ausencia específica
export const consultarAusencia = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la ausencia por ID
    const ausencia = await Ausencia.findById(id).populate('id_empleado', 'nombre correo cargo');
    if (!ausencia) {
      return res.status(404).json({ mensaje: 'Ausencia no encontrada' });
    }

    res.status(200).json(ausencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar ausencia', error });
  }
};

// Controlador para modificar una ausencia
export const modificarAusencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_empleado, fecha, motivo } = req.body;

    // Verificar si el empleado existe
    if (id_empleado) {
      const empleado = await Empleado.findById(id_empleado);
      if (!empleado) {
        return res.status(404).json({ mensaje: 'Empleado no encontrado' });
      }
    }

    // Actualizar la ausencia
    const ausenciaActualizada = await Ausencia.findByIdAndUpdate(
      id,
      { id_empleado, fecha, motivo },
      { new: true }
    );

    if (!ausenciaActualizada) {
      return res.status(404).json({ mensaje: 'Ausencia no encontrada' });
    }

    res.status(200).json({ mensaje: 'Ausencia actualizada', ausencia: ausenciaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar ausencia', error });
  }
};

// Controlador para borrar una ausencia
export const borrarAusencia = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar la ausencia
    const ausenciaEliminada = await Ausencia.findByIdAndDelete(id);
    if (!ausenciaEliminada) {
      return res.status(404).json({ mensaje: 'Ausencia no encontrada' });
    }

    res.status(200).json({ mensaje: 'Ausencia eliminada', ausencia: ausenciaEliminada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar ausencia', error });
  }
};
