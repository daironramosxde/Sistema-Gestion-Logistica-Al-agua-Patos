import './styles.css';
import React, { useState } from "react";
import AreaList from "./components/AreaList";
import AreaForm from "./components/AreaForm";

function App() {
  const [areaSeleccionada, setAreaSeleccionada] = useState(null);
  const [actualizarLista, setActualizarLista] = useState(false);

  const manejarEdicion = (area) => {
    setAreaSeleccionada(area);
  };

  const manejarGuardado = () => {
    setAreaSeleccionada(null);
    setActualizarLista(!actualizarLista);
  };

  return (
    <div className="container">
      <h1>Gestión de Áreas</h1>
      <AreaForm areaSeleccionada={areaSeleccionada} onAreaGuardada={manejarGuardado} />
      <AreaList key={actualizarLista} onEditar={manejarEdicion} />
    </div>
  );
}

export default App;
