import Horario from '../models/horario.js';
import Empleado from '../models/empleado.js';

export const crearHorario = async (req, res) => {
  const { id_empleado, diaSemana, horaEntrada, horaSalida } = req.body;

  try {
    const empleado = await Empleado.findById(id_empleado);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }

    const nuevoHorario = new Horario({
      id_empleado,
      diaSemana,
      horaEntrada,
      horaSalida,
    });

    const horarioGuardado = await nuevoHorario.save();
    res.status(201).json(horarioGuardado);
  } catch (error) {
    console.error('Error al crear el horario:', error);
    res.status(500).json({ error: 'Error al crear el horario.' });
  }
};

export const obtenerHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find().populate('id_empleado', 'nombre correo rol');
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los horarios.' });
  }
};

export const consultarHorario = async (req, res) => {
  const { id } = req.params;

  try {
    const horario = await Horario.findById(id);
    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado.' });
    }

    res.json(horario);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar el horario.' });
  }
};

export const actualizarHorario = async (req, res) => {
  const { id } = req.params;
  const { id_empleado, diaSemana, horaEntrada, horaSalida } = req.body;

  try {
    const horarioActualizado = await Horario.findByIdAndUpdate(
      id,
      { id_empleado, diaSemana, horaEntrada, horaSalida },
      { new: true, runValidators: true }
    );

    if (!horarioActualizado) {
      return res.status(404).json({ error: 'Horario no encontrado.' });
    }

    res.json(horarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el horario.' });
  }
};

export const eliminarHorario = async (req, res) => {
  const { id } = req.params;

  try {
    const horarioEliminado = await Horario.findByIdAndDelete(id);

    if (!horarioEliminado) {
      return res.status(404).json({ error: 'Horario no encontrado.' });
    }

    res.json({ mensaje: 'Horario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el horario.' });
  }
};
