import React from "react";
import "./Sidebar.css"; // Cambia también el nombre del archivo CSS

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>SGL AAP</h2>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/home">Inicio</a>
        </li>
        <li>
          <a href="/recursos">Login</a>
        </li>
        <li>
          <a href="/empleados">Nosotros</a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;

