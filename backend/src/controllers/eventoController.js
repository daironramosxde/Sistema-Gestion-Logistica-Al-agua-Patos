import { Evento } from '../models/evento.js'; // Importa el modelo de Evento

// Crear un nuevo evento
export const crearEvento = async (req, res) => {
  const { fecha_evento, descripcion, cliente_id } = req.body;
  try {
    const evento = new Evento({ fecha_evento, descripcion, cliente_id });
    const data = await evento.save();
    res.status(201).json(data); // Código de estado 201 para indicar que se creó el recurso
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los eventos
export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('cliente_id'); // Buscamos todos los eventos, populando la relación con 'Cliente'
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un evento por ID
export const obtenerEventoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findById(id).populate('cliente_id'); // Buscamos un evento por ID, populando la relación con 'Cliente'
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un evento
export const actualizarEvento = async (req, res) => {
  const { id } = req.params;
  const { fecha_evento, descripcion, cliente_id } = req.body;
  try {
    const eventoUpdate = await Evento.updateOne(
      { _id: id },
      { $set: { fecha_evento, descripcion, cliente_id } }
    );
    if (eventoUpdate.matchedCount === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    if (eventoUpdate.modifiedCount === 0) {
      return res.status(400).json({ message: 'No se realizaron cambios' });
    }
    res.status(200).json({ message: 'Evento actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un evento
export const eliminarEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Evento.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
