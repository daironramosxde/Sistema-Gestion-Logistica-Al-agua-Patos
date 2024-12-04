import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Usuario from '../src/models/Usuario.js';
import Rol from '../src/models/Rol.js';

dotenv.config();

const crearSuperUsuario = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión a la base de datos exitosa.');

    const rolSuperAdmin = await Rol.findOneAndUpdate(
      { nombre: 'SuperAdmin' },
      { nombre: 'SuperAdmin', descripcion: 'Acceso total al sistema' },
      { upsert: true, new: true }
    );

    const hashedPassword = await bcrypt.hash('superpassword123', 10); // Encriptar la contraseña

    const superUsuario = new Usuario({
      nombre: 'Super Usuario',
      email: 'superusuario@example2.com',
      password: hashedPassword,
      rol: rolSuperAdmin._id,
    });

    await superUsuario.save();

    console.log('Superusuario creado exitosamente.');
    await db.disconnect();
    console.log('Conexión a la base de datos cerrada.');
  } catch (error) {
    console.error('Error al crear el superusuario:', error);
  }
};

crearSuperUsuario();
