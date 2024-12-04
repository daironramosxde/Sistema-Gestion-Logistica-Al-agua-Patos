import Empleado from "../models/empleado.js";

// Crear un nuevo empleado
const createEmpleado = (req, res) => {
    const { nombre, correo, telefono, id_area } = req.body;
    const nuevoEmpleado = new Empleado({ nombre, correo, telefono, id_area });
    nuevoEmpleado
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener todos los empleados
const getEmpleados = (req, res) => {
    Empleado
        .find()
        .populate("id_area", "nombre_area") // Asumiendo que quieres devolver el nombre del área junto con el empleado
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Consultar un empleado por ID
const consultEmpleado = (req, res) => {
    const { id } = req.params;
    Empleado
        .findById(id)
        .populate("id_area", "nombre_area")
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Empleado no encontrado" }));
};

// Actualizar un empleado
const updateEmpleado = (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, id_area } = req.body;
    Empleado
        .findByIdAndUpdate(id, { nombre, correo, telefono, id_area }, { new: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un empleado
const deleteEmpleado = (req, res) => {
    const { id } = req.params;
    Empleado
        .findByIdAndDelete(id)
        .then((data) => res.status(200).json({ message: "Empleado eliminado exitosamente", data }))
        .catch((error) => res.status(500).json({ message: error.message }));
};

export {
    createEmpleado,
    getEmpleados,
    consultEmpleado,
    updateEmpleado,
    deleteEmpleado
};
