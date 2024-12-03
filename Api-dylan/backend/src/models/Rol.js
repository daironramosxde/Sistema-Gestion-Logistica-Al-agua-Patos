import mongoose from 'mongoose'; // Importa Mongoose para crear el esquema

// Define el esquema de la colección de roles
export  const rolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, // El nombre del rol debe ser único
  },
  descripcion: {
    type: String, // Una breve descripción opcional del rol
  },
});

// Exporta el modelo para usarlo en otros archivos
export default mongoose.model("Rol", rolSchema);