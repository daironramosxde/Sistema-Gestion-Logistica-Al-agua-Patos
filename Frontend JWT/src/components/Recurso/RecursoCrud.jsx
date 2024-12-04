import { useEffect, useState } from "react";
import axios from "axios";

function RecursoCrud() {
  const [listaRecursos, setListaRecursos] = useState([]);
  const [recursoEditado, setRecursoEditado] = useState(null);
  const [nuevoRecurso, setNuevoRecurso] = useState({
    nombre_recurso: "",
    cantidad: 0,
    ubicacion: "",
  });

  useEffect(() => {
    const consultarRecursos = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/recursos");
        setListaRecursos(response.data);
      } catch (error) {
        console.error("Ocurrió este error al consultar los recursos: ", error);
      }
    };
    consultarRecursos();
  }, []);



  const actualizarRecurso = async (_id) => {
    const recurso = listaRecursos.find((r) => r._id === _id);
    setRecursoEditado(recurso);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/recursos/${recursoEditado._id}`,
        recursoEditado
      );
      setListaRecursos((prev) =>
        prev.map((recurso) =>
          recurso._id === recursoEditado._id ? response.data : recurso
        )
      );
      setRecursoEditado(null); // Cerrar el modal
      alert("Recurso actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el recurso:", error);
    }
  };

  const borarrRecurso = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/recursos/${_id}`);
      setListaRecursos(listaRecursos.filter((recurso) => recurso._id !== _id));
      alert("El recurso fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el recurso:", error);
    }
  };
  const agregarRecurso = async () => {
    try {
      //      Realiza una solicitud POST a la API para agregar el nuevo recurso
    const response = await axios.post("http://localhost:9000/api/recursos", nuevoRecurso);
      // Actualiza la lista de recursos con el nuevo recurso agregado
    setListaRecursos((prev) => [...prev, response.data]);
      // Limpia el formulario
    setNuevoRecurso({
        nombre_recurso: "",
        cantidad: 1,
        ubicacion: "",
    });
        alert("Recurso agregado con éxito");
    } catch (error) {
        console.error("Error al agregar el recurso:", error);
    }
  };

  return (
      <div className="container-todo">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">nombre</th>
            <th scope="col">cantidad</th>
            <th scope="col">ubicacion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {listaRecursos.map((recurso, index) => (
            <tr key={recurso._id || index}> 
              <th scope="row">{recurso._id}</th>
              <td>{recurso.nombre_recurso}</td>
              <td>{recurso.cantidad}</td>
              <td>{recurso.ubicacion}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => actualizarRecurso(recurso._id)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => borarrRecurso(recurso._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Modal de Agregar*/}
      <div className="container-agregar">
        <h4>Agregar Nuevo Recurso</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Evita que la página se recargue
            agregarRecurso();
          }}
        >
          <div className="mb-3">
            <label htmlFor="nombreRecurso" className="form-label">
              Nombre del Recurso:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreRecurso"
              value={nuevoRecurso.nombre_recurso}
              onChange={(e) =>
                setNuevoRecurso({ ...nuevoRecurso, nombre_recurso: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">
              Cantidad:
            </label>
            <input
              type="number"
              className="form-control"
              id="cantidad"
              value={nuevoRecurso.cantidad}
              onChange={(e) =>
                setNuevoRecurso({ ...nuevoRecurso, cantidad: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ubicacion" className="form-label">
              Ubicación:
            </label>
            <input
              type="text"
              className="form-control"
              id="ubicacion"
              value={nuevoRecurso.ubicacion}
              onChange={(e) =>
                setNuevoRecurso({ ...nuevoRecurso, ubicacion: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
        </div>
      {/* Modal de edición */}
      {recursoEditado && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Recurso</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setRecursoEditado(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      value={recursoEditado.nombre_recurso}
                      onChange={(e) =>
                        setRecursoEditado({
                          ...recursoEditado,
                          nombre_recurso: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="cantidad"
                      value={recursoEditado.cantidad}
                      onChange={(e) =>
                        setRecursoEditado({
                          ...recursoEditado,
                          cantidad: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ubicacion"
                      value={recursoEditado.ubicacion}
                      onChange={(e) =>
                        setRecursoEditado({
                          ...recursoEditado,
                          ubicacion: e.target.value,
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
                  onClick={() => setRecursoEditado(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={guardarCambios}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecursoCrud;
