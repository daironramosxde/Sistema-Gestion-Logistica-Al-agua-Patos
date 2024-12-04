import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
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
    ref: 'Rol',
    required: true,
  },
});

userSchema.pre('save', async function(next) {
  const usuario = this;
  if (!usuario.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Usar mongoose.models para evitar la redefinición del modelo
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', userSchema);

export default Usuario;
