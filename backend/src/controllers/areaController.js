import Area from '../models/area.js';

// Controlador para crear un área
export const crearArea = async (req, res) => {
  try {
    const { nombre_area } = req.body;

    // Crear y guardar el área
    const nuevaArea = new Area({ nombre_area });
    await nuevaArea.save();
    res.status(201).json({ mensaje: 'Área creada', area: nuevaArea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear área', error });
  }
};

// Controlador para listar todas las áreas
export const listarAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener áreas', error });
  }
};

// Controlador para consultar un área específica
export const consultarArea = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el área por ID
    const area = await Area.findById(id);
    if (!area) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }

    res.status(200).json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar área', error });
  }
};

// Controlador para modificar un área
export const modificarArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_area } = req.body;

    // Actualizar el área
    const areaActualizada = await Area.findByIdAndUpdate(
      id,
      { nombre_area },
      { new: true }
    );

    if (!areaActualizada) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }

    res.status(200).json({ mensaje: 'Área actualizada', area: areaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar área', error });
  }
};

// Controlador para borrar un área
export const borrarArea = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el área
    const areaEliminada = await Area.findByIdAndDelete(id);
    if (!areaEliminada) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }

    res.status(200).json({ mensaje: 'Área eliminada', area: areaEliminada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar área', error });
  }
};
