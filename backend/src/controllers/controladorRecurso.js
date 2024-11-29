import Recurso from "../models/recurso.js";

const crearRecurso = (req, res) => {
    const recurso = new Recurso(req.body);
    recurso
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

const obtenerRecursos = (req, res) => {
    Recurso
        .find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

const consultarRecurso = (req, res) => {
    const { id } = req.params;
    Recurso
        .findById(id)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Recurso no encontrado" }));
};

const actualizarRecurso = (req, res) => {
    const { id } = req.params;
    const { nombre_recurso, cantidad, ubicacion } = req.body;
    Recurso
        .updateOne({ _id: id }, { $set: { nombre_recurso, cantidad, ubicacion } })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

const borrarRecurso = (req, res) => {
    const { id } = req.params;
    Recurso
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

export {
    crearRecurso,
    obtenerRecursos,
    consultarRecurso,
    actualizarRecurso,
    borrarRecurso
};
