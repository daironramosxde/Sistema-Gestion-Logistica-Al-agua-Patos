import { Horario } from '../models/horario.js';

// Crear un nuevo horario
const createHorario = (req, res) => {
  const { id_empleado, dia_semana, hora_entrada, hora_salida } = req.body;

  const nuevoHorario = new Horario({ id_empleado, dia_semana, hora_entrada, hora_salida });
  nuevoHorario
    .save()
    .then((data) => res.status(201).json({ message: "Horario creado exitosamente", horario: data }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener todos los horarios
const getHorarios = (req, res) => {
  Horario.find()
    .populate("id_empleado") // Relacionar el empleado con el horario
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener un horario por ID
const getHorario = (req, res) => {
  const { id } = req.params;

  Horario.findById(id)
    .populate("id_empleado") // Relacionar el empleado con el horario
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Horario no encontrado" });
      }
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Actualizar un horario
const updateHorario = (req, res) => {
  const { id } = req.params;
  const { id_empleado, dia_semana, hora_entrada, hora_salida } = req.body;

  Horario.findById(id)
    .then((horario) => {
      if (!horario) {
        return res.status(404).json({ message: "Horario no encontrado" });
      }

      horario.id_empleado = id_empleado || horario.id_empleado;
      horario.dia_semana = dia_semana || horario.dia_semana;
      horario.hora_entrada = hora_entrada || horario.hora_entrada;
      horario.hora_salida = hora_salida || horario.hora_salida;

      return horario.save();
    })
    .then((updatedHorario) => res.status(200).json(updatedHorario))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un horario
const deleteHorario = (req, res) => {
  const { id } = req.params;

  Horario.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Horario eliminado exitosamente" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export { createHorario, getHorarios, getHorario, updateHorario, deleteHorario };
