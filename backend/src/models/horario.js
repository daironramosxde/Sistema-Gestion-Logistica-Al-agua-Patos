import mongoose from 'mongoose';

const horarioSchema = new mongoose.Schema({
  idEmpleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado', // Conexión con el modelo de empleados
    required: true,
  },
  diaSemana: {
    type: String,
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    required: true,
  },
  horaEntrada: {
    type: String,
    required: true, // Ejemplo: '08:00 AM'
  },
  horaSalida: {
    type: String,
    required: true, // Ejemplo: '05:00 PM'
  },
});

export default mongoose.model('Horario', horarioSchema);
