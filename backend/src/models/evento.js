import mongoose from 'mongoose';

// Define el esquema de la colección de eventos
const eventoSchema = new mongoose.Schema({
  fecha_evento: {
    type: Date,
    required: true, // La fecha del evento es obligatoria
  },
  descripcion: {
    type: String,
    required: true, // La descripción del evento es obligatoria
  },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', // Relaciona el evento con la colección 'Cliente'
    required: true, // El cliente asociado al evento es obligatorio
  },
});

// Exporta el modelo para usarlo en otros archivos
export const Evento = mongoose.model('Evento', eventoSchema);
export default Evento;
