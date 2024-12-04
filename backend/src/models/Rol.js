import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
  },
});

// Verifica si el modelo ya está compilado
const Rol = mongoose.models.Rol || mongoose.model("Rol", rolSchema);

export default Rol;
