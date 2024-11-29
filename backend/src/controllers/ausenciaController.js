import { Ausencia } from "../models/ausencia.js";
import Empleado from "../models/empleado.js";


export const registrarAusencia = async (req, res) => {
  try {
    const { id_empleado, fecha, motivo } = req.body;

    // Verificar si el empleado existe
    const empleado = await Empleado.findById(id_empleado);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Crear la ausencia
    const nuevaAusencia = new Ausencia({ id_empleado, fecha, motivo });
    await nuevaAusencia.save();
    res.status(201).json({ message: "Ausencia registrada", nuevaAusencia });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar ausencia", error });
  }
};

export const listarAusencias = async (req, res) => {
  try {
    const ausencias = await Ausencia.find().populate("id_empleado", "nombre correo cargo");
    res.status(200).json(ausencias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ausencias", error });
  }
};

export const consultarAusencia = async (req, res) => {
  try {
    const ausencia = await Ausencia.findById(req.params.id).populate("id_empleado", "nombre correo cargo");
    if (!ausencia) {
      return res.status(404).json({ message: "Ausencia no encontrada" });
    }
    res.status(200).json(ausencia);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar ausencia", error });
  }
};

export const modificarAusencia = async (req, res) => {
  try {
    const { id_empleado, fecha, motivo } = req.body;

    // Verificar si el empleado existe
    if (id_empleado) {
      const empleado = await Empleado.findById(id_empleado);
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
    }

    const ausenciaActualizada = await Ausencia.findByIdAndUpdate(
      req.params.id,
      { id_empleado, fecha, motivo },
      { new: true }
    );

    if (!ausenciaActualizada) {
      return res.status(404).json({ message: "Ausencia no encontrada" });
    }

    res.status(200).json({ message: "Ausencia actualizada", ausenciaActualizada });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar ausencia", error });
  }
};

export const borrarAusencia = async (req, res) => {
  try {
    const ausenciaEliminada = await Ausencia.findByIdAndDelete(req.params.id);
    if (!ausenciaEliminada) {
      return res.status(404).json({ message: "Ausencia no encontrada" });
    }
    res.status(200).json({ message: "Ausencia eliminada", ausenciaEliminada });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ausencia", error });
  }
};
