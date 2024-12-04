import { useEffect, useState } from "react";
import axios from "axios";

function ClientesCrud() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditado, setClienteEditado] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre_cliente: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    const consultarClientes = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/cliente");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al consultar clientes: ", error);
      }
    };

    consultarClientes();
  }, []);

  const actualizarCliente = (_id) => {
    const cliente = clientes.find((c) => c._id === _id);
    setClienteEditado(cliente);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(`http://localhost:9000/api/cliente/${clienteEditado._id}`,
        clienteEditado
      );
      setClientes((prev) =>
        prev.map((cliente) =>
          cliente._id === clienteEditado._id ? response.data : cliente
        )
      );
      setClienteEditado(null);
      alert("Cliente actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const borrarCliente = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/cliente/${_id}`);
      setClientes(clientes.filter((cliente) => cliente._id !== _id));
      alert("El cliente fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  const agregarCliente = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/cliente", nuevoCliente);
      setClientes((prev) => [...prev, response.data]);
      setNuevoCliente({
        nombre_cliente: "",
        telefono: "",
        email: "",
      });
      alert("Cliente agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
    }
  };

  return (
    <div className="container-todo">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Cliente</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={cliente._id || index}>
              <td>{cliente._id || "N/A"}</td>
              <td>{cliente.nombre_cliente || "Sin nombre"}</td>
              <td>{cliente.telefono || "Sin teléfono"}</td>
              <td>{cliente.email || "Sin email"}</td>
              <td>
                <button className="btn btn-info" onClick={() => actualizarCliente(cliente._id)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => borrarCliente(cliente._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container-agregar">
        <h4>Agregar Nuevo Cliente</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarCliente();
          }}
        >
          <div className="mb-3">
            <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente:</label>
            <input
              type="text"
              className="form-control"
              id="nombreCliente"
              value={nuevoCliente.nombre_cliente}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, nombre_cliente: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono:</label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              value={nuevoCliente.telefono}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={nuevoCliente.email}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, email: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </div>

      {clienteEditado && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Cliente</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setClienteEditado(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombreClienteEdit" className="form-label">Nombre del Cliente:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombreClienteEdit"
                      value={clienteEditado.nombre_cliente}
                      onChange={(e) =>
                        setClienteEditado({
                          ...clienteEditado,
                          nombre_cliente: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telefonoEdit" className="form-label">Teléfono:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telefonoEdit"
                      value={clienteEditado.telefono}
                      onChange={(e) =>
                        setClienteEditado({
                          ...clienteEditado,
                          telefono: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="emailEdit" className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailEdit"
                      value={clienteEditado.email}
                      onChange={(e) =>
                        setClienteEditado({
                          ...clienteEditado,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setClienteEditado(null)}
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={guardarCambios}>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientesCrud;
