import { useEffect, useState } from "react";
import axios from "axios";

function EmpleadosCrud() {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [listaAreas, setListaAreas] = useState([]);
  const [empleadoEditado, setEmpleadoEditado] = useState(null);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    id_area: "",
  });

  useEffect(() => {
    const consultarDatos = async () => {
      try {
        const [empleadosResponse, areasResponse] = await Promise.all([
          axios.get("http://localhost:9000/api/empleados"),
          axios.get("http://localhost:9000/api/areas"),
        ]);
        setListaEmpleados(empleadosResponse.data);
        setListaAreas(areasResponse.data);
      } catch (error) {
        console.error("Ocurrió un error al consultar los datos: ", error);
      }
    };
    consultarDatos();
  }, []);

  const actualizarEmpleado = (_id) => {
    const empleado = listaEmpleados.find((e) => e._id === _id);
    setEmpleadoEditado(empleado);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/empleados/${empleadoEditado._id}`,
        empleadoEditado
      );
      setListaEmpleados((prev) =>
        prev.map((empleado) =>
          empleado._id === empleadoEditado._id ? response.data : empleado
        )
      );
      setEmpleadoEditado(null);
      alert("Empleado actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
    }
  };

  const borrarEmpleado = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/empleados/${_id}`);
      setListaEmpleados(listaEmpleados.filter((empleado) => empleado._id !== _id));
      alert("Empleado eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
    }
  };

  const agregarEmpleado = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/empleados",
        nuevoEmpleado
      );
      setListaEmpleados((prev) => [...prev, response.data]);
      setNuevoEmpleado({
        nombre: "",
        correo: "",
        telefono: "",
        id_area: "",
      });
      alert("Empleado agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el empleado:", error);
    }
  };

  return (
    <div className="container-todo">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Área</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaEmpleados.map((empleado, index) => (
            <tr key={empleado._id || index}>
              <th scope="row">{empleado._id}</th>
              <td>{empleado.nombre}</td>
              <td>{empleado.correo}</td>
              <td>{empleado.telefono}</td>
              <td>
                {
                  listaAreas.find((area) => area._id === empleado.id_area)?.nombre_area ||
                  "Sin área"
                }
              </td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => actualizarEmpleado(empleado._id)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => borrarEmpleado(empleado._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-agregar">
        <h4>Agregar Nuevo Empleado</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarEmpleado();
          }}
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nuevoEmpleado.nombre}
              onChange={(e) =>
                setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo:
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              value={nuevoEmpleado.correo}
              onChange={(e) =>
                setNuevoEmpleado({ ...nuevoEmpleado, correo: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono:
            </label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              value={nuevoEmpleado.telefono}
              onChange={(e) =>
                setNuevoEmpleado({ ...nuevoEmpleado, telefono: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="area" className="form-label">
              Área:
            </label>
            <select
              className="form-control"
              id="area"
              value={nuevoEmpleado.id_area}
              onChange={(e) =>
                setNuevoEmpleado({ ...nuevoEmpleado, id_area: e.target.value })
              }
              required
            >
              <option value="">Seleccione un área</option>
              {listaAreas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.nombre_area}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>
      {empleadoEditado && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Empleado</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEmpleadoEditado(null)}
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
                      value={empleadoEditado.nombre}
                      onChange={(e) =>
                        setEmpleadoEditado({
                          ...empleadoEditado,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                      Correo
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      value={empleadoEditado.correo}
                      onChange={(e) =>
                        setEmpleadoEditado({
                          ...empleadoEditado,
                          correo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="telefono"
                      value={empleadoEditado.telefono}
                      onChange={(e) =>
                        setEmpleadoEditado({
                          ...empleadoEditado,
                          telefono: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="area" className="form-label">
                      Área
                    </label>
                    <select
                      className="form-control"
                      id="area"
                      value={empleadoEditado.id_area}
                      onChange={(e) =>
                        setEmpleadoEditado({
                          ...empleadoEditado,
                          id_area: e.target.value,
                        })
                      }
                    >
                      {listaAreas.map((area) => (
                        <option key={area._id} value={area._id}>
                          {area.nombre_area}
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
                  onClick={() => setEmpleadoEditado(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={guardarCambios}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmpleadosCrud;
