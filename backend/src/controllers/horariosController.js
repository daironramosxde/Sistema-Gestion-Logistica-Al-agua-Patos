import { Horario } from "../models/horario.js";
import Empleado from "../models/empleado.js";

export const registrarHorario = async (req, res) => {
  try {
    const { id_empleado, dia_semana, hora_entrada, hora_salida } = req.body;

    // Verificar si el empleado existe
    const empleado = await Empleado.findById(id_empleado);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Crear el horario
    const nuevoHorario = new Horario({ id_empleado, dia_semana, hora_entrada, hora_salida });
    await nuevoHorario.save();
    res.status(201).json({ message: "Horario registrado", nuevoHorario });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar horario", error });
  }
};

export const listarHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find().populate("id_empleado", "nombre correo cargo");
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener horarios", error });
  }
};

export const consultarHorario = async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id).populate("id_empleado", "nombre correo cargo");
    if (!horario) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }
    res.status(200).json(horario);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar horario", error });
  }
};

export const modificarHorario = async (req, res) => {
  try {
    const { id_empleado, dia_semana, hora_entrada, hora_salida } = req.body;

    // Verificar si el empleado existe
    if (id_empleado) {
      const empleado = await Empleado.findById(id_empleado);
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
    }

    const horarioActualizado = await Horario.findByIdAndUpdate(
      req.params.id,
      { id_empleado, dia_semana, hora_entrada, hora_salida },
      { new: true }
    );

    if (!horarioActualizado) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }

    res.status(200).json({ message: "Horario actualizado", horarioActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar horario", error });
  }
};

export const borrarHorario = async (req, res) => {
  try {
    const horarioEliminado = await Horario.findByIdAndDelete(req.params.id);
    if (!horarioEliminado) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }
    res.status(200).json({ message: "Horario eliminado", horarioEliminado });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar horario", error });
  }
};
