import mongoose from "mongoose";

const beneficioSchema = mongoose.Schema({
  id_empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true
  },
  monto: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  }
});

export const Beneficio = mongoose.model("Beneficio", beneficioSchema);
export default Beneficio;

