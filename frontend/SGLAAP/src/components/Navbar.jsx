import React from "react";
import "./Navbar.css"; // Archivo de estilos para la barra lateral

function Navbar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>SGL AAP</h2>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/recursos">Recursos</a>
        </li>
        <li>
          <a href="/empleados">Empleados</a>
        </li>
        <li>
          <a href="/ausencias">Ausencias</a>
        </li>
        <li>
          <a href="/areas">Áreas</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
