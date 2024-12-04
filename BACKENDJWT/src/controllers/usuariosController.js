import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Para manejar la creación de tokens JWT

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const nuevoUsuario = new Usuario({ nombre, email, password, rol });
    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
const getUsuarios = (req, res) => {
  Usuario.find()
    .populate('rol') // Obtener los detalles del rol usando populate
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Consultar un usuario por ID
const consultUsuario = (req, res) => {
  const { id } = req.params;

  Usuario.findById(id)
    .populate('rol')
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ message: "Usuario no encontrado" }));
};

// Actualizar un usuario
const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;

  Usuario.findById(id)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      usuario.nombre = nombre || usuario.nombre;
      usuario.email = email || usuario.email;
      if (password) {
        usuario.password = bcrypt.hashSync(password, 10); // Encriptar la nueva contraseña
      }
      usuario.rol = rol || usuario.rol;

      return usuario.save();
    })
    .then((updatedUsuario) => res.status(200).json(updatedUsuario))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un usuario
const deleteUsuario = (req, res) => {
  const { id } = req.params;

  Usuario.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Usuario eliminado exitosamente" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Autenticación de usuario (Login)
const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email }).populate('rol');
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol.nombre }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUsuario, getUsuarios, consultUsuario, updateUsuario, deleteUsuario, loginUsuario };
