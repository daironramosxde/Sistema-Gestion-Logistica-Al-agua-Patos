import { Evento } from '../models/evento.js';

// Crear un nuevo evento
const createEvento = (req, res) => {
  const { fecha_evento, descripcion, cliente_id } = req.body;

  const nuevoEvento = new Evento({ fecha_evento, descripcion, cliente_id });
  nuevoEvento
    .save()
    .then((data) => res.status(201).json({ message: "Evento creado exitosamente", evento: data }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener todos los eventos
const getEventos = (req, res) => {
  Evento.find()
    .populate('cliente_id') // Relacionar el cliente con el evento
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener un evento por ID
const getEvento = (req, res) => {
  const { id } = req.params;

  Evento.findById(id)
    .populate('cliente_id') // Relacionar el cliente con el evento
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Actualizar un evento
const updateEvento = (req, res) => {
  const { id } = req.params;
  const { fecha_evento, descripcion, cliente_id } = req.body;

  Evento.findById(id)
    .then((evento) => {
      if (!evento) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }

      evento.fecha_evento = fecha_evento || evento.fecha_evento;
      evento.descripcion = descripcion || evento.descripcion;
      evento.cliente_id = cliente_id || evento.cliente_id;

      return evento.save();
    })
    .then((updatedEvento) => res.status(200).json(updatedEvento))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un evento
const deleteEvento = (req, res) => {
  const { id } = req.params;

  Evento.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Evento eliminado exitosamente" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export { createEvento, getEventos, getEvento, updateEvento, deleteEvento };
