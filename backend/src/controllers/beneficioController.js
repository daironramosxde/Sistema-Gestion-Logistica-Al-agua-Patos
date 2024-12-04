import Beneficio from '../models/beneficio.js';
import Empleado from '../models/empleado.js';

// Controlador para registrar un beneficio
export const crearBeneficio = async (req, res) => {
  try {
    const { id_empleado, monto, fecha } = req.body;

    // Verificar si el empleado existe
    const empleado = await Empleado.findById(id_empleado);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    // Crear y guardar el beneficio
    const nuevoBeneficio = new Beneficio({ id_empleado, monto, fecha });
    await nuevoBeneficio.save();
    res.status(201).json({ mensaje: 'Beneficio registrado', beneficio: nuevoBeneficio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar beneficio', error });
  }
};

// Controlador para listar todos los beneficios
export const listarBeneficios = async (req, res) => {
  try {
    const beneficios = await Beneficio.find().populate('id_empleado', 'nombre correo cargo');
    res.status(200).json(beneficios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener beneficios', error });
  }
};

// Controlador para consultar un beneficio específico
export const consultarBeneficio = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el beneficio por ID
    const beneficio = await Beneficio.findById(id).populate('id_empleado', 'nombre correo cargo');
    if (!beneficio) {
      return res.status(404).json({ mensaje: 'Beneficio no encontrado' });
    }

    res.status(200).json(beneficio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar beneficio', error });
  }
};

// Controlador para modificar un beneficio
export const modificarBeneficio = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_empleado, monto, fecha } = req.body;

    // Verificar si el empleado existe
    if (id_empleado) {
      const empleado = await Empleado.findById(id_empleado);
      if (!empleado) {
        return res.status(404).json({ mensaje: 'Empleado no encontrado' });
      }
    }

    // Actualizar el beneficio
    const beneficioActualizado = await Beneficio.findByIdAndUpdate(
      id,
      { id_empleado, monto, fecha },
      { new: true }
    );

    if (!beneficioActualizado) {
      return res.status(404).json({ mensaje: 'Beneficio no encontrado' });
    }

    res.status(200).json({ mensaje: 'Beneficio actualizado', beneficio: beneficioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar beneficio', error });
  }
};

// Controlador para borrar un beneficio
export const borrarBeneficio = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el beneficio
    const beneficioEliminado = await Beneficio.findByIdAndDelete(id);
    if (!beneficioEliminado) {
      return res.status(404).json({ mensaje: 'Beneficio no encontrado' });
    }

    res.status(200).json({ mensaje: 'Beneficio eliminado', beneficio: beneficioEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar beneficio', error });
  }
};
