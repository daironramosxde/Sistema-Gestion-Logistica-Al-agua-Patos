import { useState } from "react";
import axios from "axios";

function AreaForm({ areaSeleccionada, onAreaGuardada }) {
  const [nombre_area, setNombreArea] = useState(areaSeleccionada ? areaSeleccionada.nombre_area : "");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      if (areaSeleccionada) {
        // Actualizar área
        await axios.put(`http://localhost:9000/api/areas/${areaSeleccionada._id}`, { nombre_area });
      } else {
        // Crear nueva área
        await axios.post("http://localhost:9000/api/areas", { nombre_area });
      }
      onAreaGuardada();
      alert("Área guardada con éxito");
    } catch (error) {
      console.error("Error al guardar el área:", error);
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="form-group">
        <label htmlFor="nombre_area">Nombre del Área</label>
        <input
          type="text"
          id="nombre_area"
          className="form-control"
          value={nombre_area}
          onChange={(e) => setNombreArea(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {areaSeleccionada ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}

export default AreaForm;
