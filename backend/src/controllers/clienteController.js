import Cliente from '../models/cliente.js'; // Importa el modelo de Cliente
import { validatorHandler } from '../middlewares/validator.handler.js'; // Importa el middleware de validación
import {
  createClienteSchema,
  updateClienteSchema,
  deleteClienteSchema,
  getClienteSchema,
} from '../validations/clienteValidator.js'; // Importa los esquemas de validación

// Crear un nuevo cliente
export const crearCliente = [
  validatorHandler(createClienteSchema, 'body'),
  async (req, res) => {
    const cliente = new Cliente(req.body);
    try {
      const data = await cliente.save();
      res.status(201).json(data); // Código de estado 201 para indicar que se creó el recurso
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
export const obtenerClientePorId = [
  validatorHandler(getClienteSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Actualizar un cliente
export const actualizarCliente = [
  validatorHandler(getClienteSchema, 'params'),
  validatorHandler(updateClienteSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const { nombre_cliente, telefono, email } = req.body;
    try {
      const clienteUpdate = await Cliente.updateOne(
        { _id: id },
        { $set: { nombre_cliente, telefono, email } }
      );
      if (clienteUpdate.matchedCount === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      if (clienteUpdate.modifiedCount === 0) {
        return res.status(400).json({ message: 'No se realizaron cambios' });
      }
      res.status(200).json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Borrar un cliente
export const borrarCliente = [
  validatorHandler(deleteClienteSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Cliente.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
