import { Ausencia } from "../models/ausencia.js";

// Crear una nueva ausencia
const createAusencia = (req, res) => {
    const { id_empleado, fecha, motivo } = req.body;
    const nuevaAusencia = new Ausencia({ id_empleado, fecha, motivo });
    nuevaAusencia
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener todas las ausencias
const getAusencias = (req, res) => {
    Ausencia
        .find()
        .populate("id_empleado", "nombre") // Suponiendo que quieres devolver el nombre del empleado junto con la ausencia
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Consultar una ausencia por ID
const consultAusencia = (req, res) => {
    const { id } = req.params;
    Ausencia
        .findById(id)
        .populate("id_empleado", "nombre")
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Ausencia no encontrada" }));
};

// Actualizar una ausencia
const updateAusencia = (req, res) => {
    const { id } = req.params;
    const { fecha, motivo } = req.body;
    Ausencia
        .findByIdAndUpdate(id, { fecha, motivo }, { new: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar una ausencia
const deleteAusencia = (req, res) => {
    const { id } = req.params;
    Ausencia
        .findByIdAndDelete(id)
        .then((data) => res.status(200).json({ message: "Ausencia eliminada exitosamente", data }))
        .catch((error) => res.status(500).json({ message: error.message }));
};

export {
    createAusencia,
    getAusencias,
    consultAusencia,
    updateAusencia,
    deleteAusencia
};
