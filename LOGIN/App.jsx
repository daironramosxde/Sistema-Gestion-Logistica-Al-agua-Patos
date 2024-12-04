import "./styles.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AreaList from "./components/AreaList";
import AreaForm from "./components/AreaForm";
import Login from "./components/Login";

function Home() {
  return <h2>Bienvenido al Sistema de Gestión del Restaurante</h2>;
}

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
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/areas"
            element={
              <>
                <h1>Gestión de Áreas</h1>
                <AreaForm
                  areaSeleccionada={areaSeleccionada}
                  onAreaGuardada={manejarGuardado}
                />
                <AreaList
                  key={actualizarLista}
                  onEditar={manejarEdicion}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
