import mongoose from "mongoose";

const ausenciaSchema = mongoose.Schema({
  id_empleado: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado", 
    required: true 
},
  fecha: { 
    type: Date, 
    required: true 
},
  motivo: { 
    type: String, 
    required: true 
  },
});

export const Ausencia = mongoose.model("Ausencia", ausenciaSchema);
