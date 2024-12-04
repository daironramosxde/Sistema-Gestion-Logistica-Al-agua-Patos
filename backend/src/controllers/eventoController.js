import Evento from '../models/evento.js';

// Registrar un evento
export const crearEvento = async (req, res) => {
  try {
    const { nombre, fecha, lugar, descripcion } = req.body;

    const nuevoEvento = new Evento({ nombre, fecha, lugar, descripcion });
    await nuevoEvento.save();
    res.status(201).json({ mensaje: 'Evento registrado', evento: nuevoEvento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar evento', error });
  }
};

// Listar todos los eventos
export const listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.status(200).json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener eventos', error });
  }
};

// Consultar un evento específico
export const consultarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const evento = await Evento.findById(id);
    if (!evento) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }

    res.status(200).json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar evento', error });
  }
};

// Modificar un evento
export const modificarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, fecha, lugar, descripcion } = req.body;

    const eventoActualizado = await Evento.findByIdAndUpdate(
      id,
      { nombre, fecha, lugar, descripcion },
      { new: true }
    );

    if (!eventoActualizado) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }

    res.status(200).json({ mensaje: 'Evento actualizado', evento: eventoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar evento', error });
  }
};

// Borrar un evento
export const borrarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const eventoEliminado = await Evento.findByIdAndDelete(id);
    if (!eventoEliminado) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }

    res.status(200).json({ mensaje: 'Evento eliminado', evento: eventoEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar evento', error });
  }
};
