import Area from "../models/area.js";

const crearArea = (req, res) => {
    const area = new Area(req.body);
    area
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

const obtenerAreas = (req, res) => {
    Area
        .find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

const consultarArea = (req, res) => {
    const { id } = req.params;
    Area
        .findById(id)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Área no encontrada" }));
};

const actualizarArea = (req, res) => {
    const { id } = req.params;
    const { nombre_area } = req.body;
    Area
        .updateOne({ _id: id }, { $set: { nombre_area } })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

const borrarArea = (req, res) => {
    const { id } = req.params;
    Area
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

export {
    crearArea,
    obtenerAreas,
    consultarArea,
    actualizarArea,
    borrarArea
};
