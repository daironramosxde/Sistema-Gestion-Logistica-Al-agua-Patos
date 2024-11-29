import bcrypt from 'bcrypt'; // Importa bcrypt para encriptar contraseñas
import mongoose from 'mongoose'; // Importa Mongoose para crear el esquema

// Define el esquema de la colección de usuarios
export const userSchema = new mongoose.Schema({
  nombre: {
    type: String, // El nombre es un campo de tipo string
    required: true, // Es obligatorio
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un email válido.']
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});



// Exporta el modelo para usarlo en otros archivos
export default mongoose.model("Usuario", userSchema);
