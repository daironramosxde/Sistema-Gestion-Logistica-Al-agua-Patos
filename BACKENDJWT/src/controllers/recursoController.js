import Recurso from "../models/recurso.js";

// Crear un nuevo recurso
const createRecurso = (req, res) => {
    const { nombre_recurso, cantidad, ubicacion } = req.body;
    const nuevoRecurso = new Recurso({ nombre_recurso, cantidad, ubicacion });
    nuevoRecurso
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener todos los recursos
const getRecursos = (req, res) => {
    Recurso
        .find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Consultar un recurso por ID
const consultRecurso = (req, res) => {
    const { id } = req.params;
    Recurso
        .findById(id)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Recurso no encontrado" }));
};

// Actualizar un recurso
const updateRecurso = (req, res) => {
    const { id } = req.params;
    const { nombre_recurso, cantidad, ubicacion } = req.body;
    Recurso
        .findByIdAndUpdate(id, { nombre_recurso, cantidad, ubicacion }, { new: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un recurso
const deleteRecurso = (req, res) => {
    const { id } = req.params;
    Recurso
        .findByIdAndDelete(id)
        .then((data) => res.status(200).json({ message: "Recurso eliminado exitosamente", data }))
        .catch((error) => res.status(500).json({ message: error.message }));
};

export {
    createRecurso,
    getRecursos,
    consultRecurso,
    updateRecurso,
    deleteRecurso
};
