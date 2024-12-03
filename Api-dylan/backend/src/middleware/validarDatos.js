// Middleware para validar los datos de las solicitudes
import { validationResult, check } from 'express-validator';

export const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

export const validacionUsuario = [
  // Validación del nombre
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),

  // Validación del correo electrónico
  check('email', 'Debe ser un email válido').isEmail(),

  // Validación de la contraseña (al menos 6 caracteres)
  check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),

  // Validación del rol (asegúrate de que sea un ObjectId válido si lo usas como referencia)
  check('rol', 'El rol es obligatorio').not().isEmpty(),

  // Llamamos a la función que valida y maneja los errores
  validarCampos,
];

// Validación para el rol
export const validacionRol = [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos,
];

export default { validacionRol, validacionUsuario };
