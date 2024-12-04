import mongoose from 'mongoose'; // Importa Mongoose para crear el esquema

// Define el esquema de la colección de clientes
const clienteSchema = new mongoose.Schema({
  nombre_cliente: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // El email debe ser único
  },
});

export default mongoose.model('Cliente', clienteSchema); // Exporta el modelo para usarlo en otros archivos
