import { useEffect, useState } from "react";
import axios from "axios";

function EventosCrud() {
  const [listaEventos, setListaEventos] = useState([]);
  const [eventoEditado, setEventoEditado] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState({
    fecha_evento: "",
    descripcion: "",
    cliente_id: "",
  });
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const consultarEventos = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/evento");
        setListaEventos(response.data);
      } catch (error) {
        console.error("Error al consultar eventos: ", error);
      }
    };

    const consultarClientes = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/cliente");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al consultar clientes: ", error);
      }
    };

    consultarEventos();
    consultarClientes();
  }, []);

  const actualizarEvento = (_id) => {
    const evento = listaEventos.find((e) => e._id === _id);
    setEventoEditado(evento);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/evento/${eventoEditado._id}`,
        eventoEditado
      );
      setListaEventos((prev) =>
        prev.map((evento) =>
          evento._id === eventoEditado._id ? response.data : evento
        )
      );
      setEventoEditado(null);
      alert("Evento actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
    }
  };

  const borrarEvento = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/evento/${_id}`);
      setListaEventos(listaEventos.filter((evento) => evento._id !== _id));
      alert("El evento fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  const agregarEvento = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/evento", nuevoEvento);
      setListaEventos((prev) => [...prev, response.data]);
      setNuevoEvento({
        fecha_evento: "",
        descripcion: "",
        cliente_id: "",
      });
      alert("Evento agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el evento:", error);
    }
  };

  return (
    <div className="container-todo">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaEventos.map((evento, index) => (
            <tr key={evento._id || index}>
              <td>{evento._id || "N/A"}</td>
              <td>{evento.fecha_evento || "Sin fecha"}</td>
              <td>{evento.descripcion || "Sin descripción"}</td>
              <td>{evento.cliente_id?.nombre_cliente || "Desconocido"}</td>
              <td>
                <button className="btn btn-info" onClick={() => actualizarEvento(evento._id)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => borrarEvento(evento._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container-agregar">
        <h4>Agregar Nuevo Evento</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarEvento();
          }}
        >
          <div className="mb-3">
            <label htmlFor="fechaEvento" className="form-label">Fecha del Evento:</label>
            <input
              type="date"
              className="form-control"
              id="fechaEvento"
              value={nuevoEvento.fecha_evento}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, fecha_evento: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción:</label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              value={nuevoEvento.descripcion}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="clienteId" className="form-label">Cliente:</label>
            <select
              className="form-control"
              id="clienteId"
              value={nuevoEvento.cliente_id}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, cliente_id: e.target.value })
              }
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nombre_cliente}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </div>

      {eventoEditado && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Evento</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEventoEditado(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="fechaEventoEdit" className="form-label">Fecha del Evento:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fechaEventoEdit"
                      value={eventoEditado.fecha_evento}
                      onChange={(e) =>
                        setEventoEditado({
                          ...eventoEditado,
                          fecha_evento: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcionEdit" className="form-label">Descripción:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcionEdit"
                      value={eventoEditado.descripcion}
                      onChange={(e) =>
                        setEventoEditado({
                          ...eventoEditado,
                          descripcion: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="clienteIdEdit" className="form-label">Cliente:</label>
                    <select
                      className="form-control"
                      id="clienteIdEdit"
                      value={eventoEditado.cliente_id}
                      onChange={(e) =>
                        setEventoEditado({
                          ...eventoEditado,
                          cliente_id: e.target.value,
                        })
                      }
                    >
                      <option value="">Seleccione un cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente._id} value={cliente._id}>
                          {cliente.nombre_cliente}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEventoEditado(null)}
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

export default EventosCrud;
