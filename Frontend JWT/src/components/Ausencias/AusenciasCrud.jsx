import { useEffect, useState } from "react";
import axios from "axios";

function AusenciasCrud() {
  const [listaAusencias, setListaAusencias] = useState([]);
  const [ausenciaEditada, setAusenciaEditada] = useState(null);
  const [nuevaAusencia, setNuevaAusencia] = useState({
    id_empleado: "",
    fecha: "",
    motivo: "",
  });
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const consultarAusencias = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/ausencias");
        setListaAusencias(response.data);
      } catch (error) {
        console.error("Ocurrió un error al consultar las ausencias: ", error);
      }
    };

    const consultarEmpleados = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/empleados");
        setEmpleados(response.data);
      } catch (error) {
        console.error("Ocurrió un error al consultar los empleados: ", error);
      }
    };

    consultarAusencias();
    consultarEmpleados();
  }, []);

  const actualizarAusencia = (_id) => {
    const ausencia = listaAusencias.find((a) => a._id === _id);
    setAusenciaEditada(ausencia);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/ausencias/${ausenciaEditada._id}`,
        ausenciaEditada
      );
      setListaAusencias((prev) =>
        prev.map((ausencia) =>
          ausencia._id === ausenciaEditada._id ? response.data : ausencia
        )
      );
      setAusenciaEditada(null);
      alert("Ausencia actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar la ausencia:", error);
    }
  };

  const borrarAusencia = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/ausencias/${_id}`);
      setListaAusencias(listaAusencias.filter((ausencia) => ausencia._id !== _id));
      alert("La ausencia fue eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la ausencia:", error);
    }
  };

  const agregarAusencia = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/ausencias", nuevaAusencia);
      setListaAusencias((prev) => [...prev, response.data]);
      setNuevaAusencia({
        id_empleado: "",
        fecha: "",
        motivo: "",
      });
      alert("Ausencia agregada con éxito");
    } catch (error) {
      console.error("Error al agregar la ausencia:", error);
    }
  };

  return (
    <div className="container-todo">
      {/* Tabla de Ausencias */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Empleado</th>
            <th scope="col">Fecha</th>
            <th scope="col">Motivo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaAusencias.map((ausencia, index) => (
            <tr key={ausencia._id || index}>
              <th scope="row">{ausencia._id || "N/A"}</th>
              <td>
                {ausencia.id_empleado?.nombre || ausencia.id_empleado || "Desconocido"}
              </td>
              <td>
                {ausencia.fecha
                  ? new Date(ausencia.fecha).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : "Sin fecha"}
              </td>
              <td>{ausencia.motivo || "Sin motivo"}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => actualizarAusencia(ausencia._id)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => borrarAusencia(ausencia._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Agregar */}
      <div className="container-agregar">
        <h4>Agregar Nueva Ausencia</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarAusencia();
          }}
        >
          <div className="mb-3">
            <label htmlFor="idEmpleado" className="form-label">
              Empleado:
            </label>
            <select
              className="form-control"
              id="idEmpleado"
              value={nuevaAusencia.id_empleado}
              onChange={(e) =>
                setNuevaAusencia({ ...nuevaAusencia, id_empleado: e.target.value })
              }
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map((empleado) => (
                <option key={empleado._id} value={empleado._id}>
                  {empleado.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">
              Fecha:
            </label>
            <input
              type="date"
              className="form-control"
              id="fecha"
              value={nuevaAusencia.fecha}
              onChange={(e) =>
                setNuevaAusencia({ ...nuevaAusencia, fecha: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="motivo" className="form-label">
              Motivo:
            </label>
            <textarea
              className="form-control"
              id="motivo"
              value={nuevaAusencia.motivo}
              onChange={(e) =>
                setNuevaAusencia({ ...nuevaAusencia, motivo: e.target.value })
              }
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>

      {/* Modal de Edición */}
      {ausenciaEditada && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Ausencia</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAusenciaEditada(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="idEmpleadoEdit" className="form-label">
                      Empleado:
                    </label>
                    <select
                      className="form-control"
                      id="idEmpleadoEdit"
                      value={ausenciaEditada.id_empleado}
                      onChange={(e) =>
                        setAusenciaEditada({
                          ...ausenciaEditada,
                          id_empleado: e.target.value,
                        })
                      }
                    >
                      {empleados.map((empleado) => (
                        <option key={empleado._id} value={empleado._id}>
                          {empleado.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fechaEdit" className="form-label">
                      Fecha:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="fechaEdit"
                      value={ausenciaEditada.fecha}
                      onChange={(e) =>
                        setAusenciaEditada({
                          ...ausenciaEditada,
                          fecha: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="motivoEdit" className="form-label">
                      Motivo:
                    </label>
                    <textarea
                      className="form-control"
                      id="motivoEdit"
                      value={ausenciaEditada.motivo}
                      onChange={(e) =>
                        setAusenciaEditada({
                          ...ausenciaEditada,
                          motivo: e.target.value,
                        })
                      }
                      rows="3"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAusenciaEditada(null)}
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

export default AusenciasCrud;
