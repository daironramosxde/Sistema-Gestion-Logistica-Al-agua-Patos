import Horario from '../models/horario.js';
import Empleado from '../models/empleado.js';

// Obtener todos los horarios
export const obtenerHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find().populate('idEmpleado', 'nombre email');
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los horarios.' });
  }
};

// Crear un nuevo horario
export const crearHorario = async (req, res) => {
  const { idEmpleado, diaSemana, horaEntrada, horaSalida } = req.body;
  try {
    // Verifica que el empleado exista
    const empleado = await Empleado.findById(idEmpleado);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }

    const nuevoHorario = new Horario({
      idEmpleado,
      diaSemana,
      horaEntrada,
      horaSalida,
    });

    const horarioGuardado = await nuevoHorario.save();
    res.status(201).json(horarioGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el horario.' });
  }
};

// Actualizar un horario
export const actualizarHorario = async (req, res) => {
  const { id } = req.params;
  const { idEmpleado, diaSemana, horaEntrada, horaSalida } = req.body;

  try {
    const horarioActualizado = await Horario.findByIdAndUpdate(
      id,
      { idEmpleado, diaSemana, horaEntrada, horaSalida },
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

// Eliminar un horario
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
