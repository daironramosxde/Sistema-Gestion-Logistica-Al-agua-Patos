import React from "react";
import "./Navbar.css"; // Archivo de estilos para el encabezado

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="SGL AAP Logo" className="logo" />
        <h2>SGL AAP</h2>
      </div>
      <nav className="navbar-links">
        <ul>
          <li><a href="/home">Inicio</a></li>
          <li><a href="/recursos">Login</a></li>
          <li><a href="/empleados">Nosotros</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
