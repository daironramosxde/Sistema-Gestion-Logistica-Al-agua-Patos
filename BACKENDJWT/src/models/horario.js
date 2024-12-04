import mongoose from "mongoose";

const horarioSchema = mongoose.Schema({
  id_empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
  dia_semana: {
    type: String,
    required: true,
    enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
  },
  hora_entrada: {
    type: String,
    required: true,
  },
  hora_salida: {
    type: String,
    required: true,
  },
});

export const Horario = mongoose.model("Horario", horarioSchema);