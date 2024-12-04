import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Importa los estilos específicos del Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Al agua Patos
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/areas">Áreas</Link>
          </li>
          <li>
            <Link to="/recursos">Recursos</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
