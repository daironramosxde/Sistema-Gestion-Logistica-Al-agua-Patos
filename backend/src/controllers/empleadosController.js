import Empleado from '../models/empleado.js';

// Registrar un empleado
export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, correo, cargo } = req.body;

    const nuevoEmpleado = new Empleado({ nombre, correo, cargo });
    await nuevoEmpleado.save();
    res.status(201).json({ mensaje: 'Empleado registrado', empleado: nuevoEmpleado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar empleado', error });
  }
};

// Listar todos los empleados
export const listarEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener empleados', error });
  }
};

// Consultar un empleado específico
export const consultarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleado = await Empleado.findById(id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.status(200).json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar empleado', error });
  }
};

// Modificar un empleado
export const modificarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, cargo } = req.body;

    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      id,
      { nombre, correo, cargo },
      { new: true }
    );

    if (!empleadoActualizado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.status(200).json({ mensaje: 'Empleado actualizado', empleado: empleadoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar empleado', error });
  }
};

// Borrar un empleado
export const borrarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoEliminado = await Empleado.findByIdAndDelete(id);
    if (!empleadoEliminado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.status(200).json({ mensaje: 'Empleado eliminado', empleado: empleadoEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar empleado', error });
  }
};
