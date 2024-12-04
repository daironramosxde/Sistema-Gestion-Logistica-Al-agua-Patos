import Cliente from '../models/cliente.js';

// Registrar un cliente
export const crearCliente = async (req, res) => {
  try {
    const { nombre, correo, telefono } = req.body;

    const nuevoCliente = new Cliente({ nombre, correo, telefono });
    await nuevoCliente.save();
    res.status(201).json({ mensaje: 'Cliente registrado', cliente: nuevoCliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar cliente', error });
  }
};

// Listar todos los clientes
export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener clientes', error });
  }
};

// Consultar un cliente específico
export const consultarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar cliente', error });
  }
};

// Modificar un cliente
export const modificarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono } = req.body;

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { nombre, correo, telefono },
      { new: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cliente actualizado', cliente: clienteActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar cliente', error });
  }
};

// Borrar un cliente
export const borrarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if (!clienteEliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cliente eliminado', cliente: clienteEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar cliente', error });
  }
};
