import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import Rol from '../models/Rol.js';
import dotenv from 'dotenv';

dotenv.config();

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET no está definido en el archivo .env');
        return res.status(500).json({ message: 'Error en el servidor: JWT_SECRET no definido' });
    }

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }


        const rol = await Rol.findOne({ _id: ususario.rol }); 
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        const token = jwt.sign(
            { 
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );
        
        console.log('Token generado:', token);
        return res.json({ token });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export default Login;
