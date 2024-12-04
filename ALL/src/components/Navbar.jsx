import React from "react";
import "./Navbar.css"; // Archivo de estilos

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h2>SGL AAP</h2>
      </div>
      <nav className="navbar-links">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/nosotros">Nosotros</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
