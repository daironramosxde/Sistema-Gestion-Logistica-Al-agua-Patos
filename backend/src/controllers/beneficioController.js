import {Beneficio} from "../models/beneficio.js";
import Empleado from "../models/empleado.js";

// Registrar un nuevo beneficio
export const registrarBeneficio = async (req, res) => {
  try {
    const { id_empleado, monto, fecha } = req.body;

    // Verificar si el empleado existe
    const empleado = await Empleado.findById(id_empleado);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Crear el beneficio
    const nuevoBeneficio = new Beneficio({ id_empleado, monto, fecha });
    await nuevoBeneficio.save();
    res.status(201).json({ message: "Beneficio registrado", nuevoBeneficio });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar beneficio", error });
  }
};

// Listar todos los beneficios
export const listarBeneficios = async (req, res) => {
  try {
    const beneficios = await Beneficio.find().populate("id_empleado", "nombre correo cargo");
    res.status(200).json(beneficios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener beneficios", error });
  }
};

// Consultar un beneficio por ID
export const consultarBeneficio = async (req, res) => {
  try {
    const beneficio = await Beneficio.findById(req.params.id).populate("id_empleado", "nombre correo cargo");
    if (!beneficio) {
      return res.status(404).json({ message: "Beneficio no encontrado" });
    }
    res.status(200).json(beneficio);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar beneficio", error });
  }
};

// Modificar un beneficio por ID
export const modificarBeneficio = async (req, res) => {
  try {
    const { id_empleado, monto, fecha } = req.body;

    // Verificar si el empleado existe
    if (id_empleado) {
      const empleado = await Empleado.findById(id_empleado);
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
    }

    const beneficioActualizado = await Beneficio.findByIdAndUpdate(
      req.params.id,
      { id_empleado, monto, fecha },
      { new: true }
    );

    if (!beneficioActualizado) {
      return res.status(404).json({ message: "Beneficio no encontrado" });
    }

    res.status(200).json({ message: "Beneficio actualizado", beneficioActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar beneficio", error });
  }
};

// Eliminar un beneficio por ID
export const borrarBeneficio = async (req, res) => {
  try {
    const beneficioEliminado = await Beneficio.findByIdAndDelete(req.params.id);
    if (!beneficioEliminado) {
      return res.status(404).json({ message: "Beneficio no encontrado" });
    }
    res.status(200).json({ message: "Beneficio eliminado", beneficioEliminado });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar beneficio", error });
  }
};
