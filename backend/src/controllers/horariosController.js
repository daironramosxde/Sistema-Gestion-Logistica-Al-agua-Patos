import Horario from '../models/horario.js';
import Empleado from '../models/empleado.js';

// Registrar un horario
export const crearHorario = async (req, res) => {
  try {
    const { id_empleado, dia_semana, hora_entrada, hora_salida } = req.body;

    // Verificar si el empleado existe
    const empleado = await Empleado.findById(id_empleado);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    const nuevoHorario = new Horario({ id_empleado, dia_semana, hora_entrada, hora_salida });
    await nuevoHorario.save();
    res.status(201).json({ mensaje: 'Horario registrado', horario: nuevoHorario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar horario', error });
  }
};

// Listar todos los horarios
export const listarHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find().populate('id_empleado', 'nombre correo cargo');
    res.status(200).json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener horarios', error });
  }
};

// Consultar un horario específico
export const consultarHorario = async (req, res) => {
  try {
    const { id } = req.params;

    const horario = await Horario.findById(id).populate('id_empleado', 'nombre correo cargo');
    if (!horario) {
      return res.status(404).json({ mensaje: 'Horario no encontrado' });
    }

    res.status(200).json(horario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar horario', error });
  }
};

// Modificar un horario
export const modificarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_empleado, dia_semana, hora_entrada, hora_salida } = req.body;

    // Verificar si el empleado existe
    if (id_empleado) {
      const empleado = await Empleado.findById(id_empleado);
      if (!empleado) {
        return res.status(404).json({ mensaje: 'Empleado no encontrado' });
      }
    }

    const horarioActualizado = await Horario.findByIdAndUpdate(
      id,
      { id_empleado, dia_semana, hora_entrada, hora_salida },
      { new: true }
    );

    if (!horarioActualizado) {
      return res.status(404).json({ mensaje: 'Horario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Horario actualizado', horario: horarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar horario', error });
  }
};

// Borrar un horario
export const borrarHorario = async (req, res) => {
  try {
    const { id } = req.params;

    const horarioEliminado = await Horario.findByIdAndDelete(id);
    if (!horarioEliminado) {
      return res.status(404).json({ mensaje: 'Horario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Horario eliminado', horario: horarioEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar horario', error });
  }
};
