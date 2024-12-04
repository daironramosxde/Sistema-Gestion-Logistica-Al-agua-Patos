import Cliente from '../models/cliente.js';

// Crear un nuevo cliente
const createCliente = (req, res) => {
  const { nombre_cliente, telefono, email } = req.body;

  const nuevoCliente = new Cliente({ nombre_cliente, telefono, email });
  nuevoCliente
    .save()
    .then((data) => res.status(201).json({ message: "Cliente creado exitosamente", cliente: data }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener todos los clientes
const getClientes = (req, res) => {
  Cliente.find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener un cliente por ID
const getCliente = (req, res) => {
  const { id } = req.params;

  Cliente.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Actualizar un cliente
const updateCliente = (req, res) => {
  const { id } = req.params;
  const { nombre_cliente, telefono, email } = req.body;

  Cliente.findById(id)
    .then((cliente) => {
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }

      cliente.nombre_cliente = nombre_cliente || cliente.nombre_cliente;
      cliente.telefono = telefono || cliente.telefono;
      cliente.email = email || cliente.email;

      return cliente.save();
    })
    .then((updatedCliente) => res.status(200).json(updatedCliente))
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un cliente
const deleteCliente = (req, res) => {
  const { id } = req.params;

  Cliente.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Cliente eliminado exitosamente" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export { createCliente, getClientes, getCliente, updateCliente, deleteCliente };
