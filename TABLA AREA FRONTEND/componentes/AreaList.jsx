import { useEffect, useState } from "react";
import axios from "axios";

function AreaList() {
  const [listaAreas, setListaAreas] = useState([]);

  useEffect(() => {
    const consultarAreas = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/areas");
        setListaAreas(response.data);
      } catch (error) {
        console.error("Error al consultar las áreas:", error);
      }
    };
    consultarAreas();
  }, []);

  const eliminarArea = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/areas/${id}`);
      setListaAreas(listaAreas.filter(area => area._id !== id));
      alert("El área fue eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar el área:", error);
    }
  };

  return (
    <div className="container">
      <h4>Lista de Áreas</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaAreas.map((area) => (
            <tr key={area._id}>
              <td>{area._id}</td>
              <td>{area.nombre_area}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => console.log("Editar área", area)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarArea(area._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AreaList;
