import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  cargo: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Empleado", empleadoSchema);
