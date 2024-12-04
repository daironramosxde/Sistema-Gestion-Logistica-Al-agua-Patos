import { Beneficio } from '../models/beneficio.js';

// Crear un nuevo beneficio
const createBeneficio = async (req, res) => {
  const { id_empleado, monto, fecha } = req.body;

  try {
    const nuevoBeneficio = new Beneficio({ id_empleado, monto, fecha });
    await nuevoBeneficio.save();
    res.status(201).json({ message: "Beneficio creado exitosamente", beneficio: nuevoBeneficio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los beneficios
const getBeneficios = (req, res) => {
  Beneficio.find()
    .populate('id_empleado') // Obtener los detalles del empleado utilizando populate
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener un beneficio por ID
const getBeneficio = (req, res) => {
  const { id } = req.params;

  Beneficio.findById(id)
    .populate('id_empleado')
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Beneficio no encontrado" });
      }
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Actualizar un beneficio
const updateBeneficio = (req, res) => {
  const { id } = req.params;
  const { monto, fecha } = req.body;

  Beneficio.findById(id)
    .then((beneficio) => {
      if (!beneficio) {
        return res.status(404).json({ message: "Beneficio no encontrado" });
      }

      beneficio.monto = monto || beneficio.monto;
      beneficio.fecha = fecha || beneficio.fecha;

      return beneficio.save();
    })
    .then((updatedBeneficio) => res.status(200).json(updatedBeneficio))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un beneficio
const deleteBeneficio = (req, res) => {
  const { id } = req.params;

  Beneficio.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Beneficio eliminado exitosamente" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export { createBeneficio, getBeneficios, getBeneficio, updateBeneficio, deleteBeneficio };
