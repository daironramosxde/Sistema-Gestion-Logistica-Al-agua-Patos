import { useEffect, useState } from "react";
import axios from "axios";

function AreaCrud() {
  const [listaAreas, setListaArea] = useState([]);
  const [areaEditada, setAreaEditada] = useState(null);
  const [nuevaArea, setNuevaArea] = useState({
    nombre_area: "",
    cantidad: 0,
    ubicacion: "",
  });

  useEffect(() => {
    const consultarAreas = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/areas");
        setListaArea(response.data);
      } catch (error) {
        console.error("Ocurrió este error al consultar las Áreas: ", error);
      }
    };
    consultarAreas();
  }, []);

  const actualizarArea = async (_id) => {
    const area = listaAreas.find((a) => a._id === _id);
    setAreaEditada(area);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/areas/${areaEditada._id}`,
        areaEditada
      );
      setListaArea((prev) =>
        prev.map((area) =>
          area._id === areaEditada._id ? response.data : area
        )
      );
      setAreaEditada(null); // Cerrar el modal
      alert("Área actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar el área:", error);
    }
  };

  const borrarArea = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/areas/${_id}`);
      setListaArea(listaAreas.filter((area) => area._id !== _id));
      alert("El área fue eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar el área:", error);
    }
  };

  const agregarArea = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/areas", nuevaArea);
      setListaArea((prev) => [...prev, response.data]);
      setNuevaArea({
        nombre_area: "",
        cantidad: 1,
        ubicacion: "",
      });
      alert("Área agregada con éxito");
    } catch (error) {
      console.error("Error al agregar el área:", error);
    }
  };

  return (
    <div className="container-todo">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
          </tr>
        </thead>
        <tbody>
        {listaAreas.map((area, index) => (
            <tr key={area._id || index}> 
              <th scope="row">{area._id}</th>
              <td>{area.nombre_area}</td>
              <td>{area.cantidad}</td>
              <td>{area.ubicacion}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => actualizarArea(area._id)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => borrarArea(area._id)}
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
        <h4>Agregar Nueva Área</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Evita que la página se recargue
            agregarArea();
          }}
        >
          <div className="mb-3">
            <label htmlFor="nombreArea" className="form-label">
              Nombre del Área:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreArea"
              value={nuevaArea.nombre_area}
              onChange={(e) =>
                setNuevaArea({ ...nuevaArea, nombre_area: e.target.value })
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
              value={nuevaArea.cantidad}
              onChange={(e) =>
                setNuevaArea({ ...nuevaArea, cantidad: parseInt(e.target.value) })
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
              value={nuevaArea.ubicacion}
              onChange={(e) =>
                setNuevaArea({ ...nuevaArea, ubicacion: e.target.value })
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
      {areaEditada && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Área</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAreaEditada(null)}
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
                      value={areaEditada.nombre_area}
                      onChange={(e) =>
                        setAreaEditada({
                          ...areaEditada,
                          nombre_area: e.target.value,
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
                      value={areaEditada.cantidad}
                      onChange={(e) =>
                        setAreaEditada({
                          ...areaEditada,
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
                      value={areaEditada.ubicacion}
                      onChange={(e) =>
                        setAreaEditada({
                          ...areaEditada,
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
                  onClick={() => setAreaEditada(null)}
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

export default AreaCrud;
