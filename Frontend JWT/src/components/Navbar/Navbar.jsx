import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Para navegación
import { AuthContext } from "../../context/AuthContext"; // Ajusta el path según tu estructura
import "./Navbar.css"; // Archivo de estilos para la barra lateral

const Navbar = () => {
  const { logout, isAuthenticated, role } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>SGL AAP</h2>
      </div>
      <ul className={`nav-links ${menuVisible ? "visible" : ""}`}>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/" onClick={toggleMenu}>Inicio</Link>
            </li>
            <li>
              <Link to="/recursos" onClick={toggleMenu}>Recursos</Link>
            </li>
            {/* Más rutas condicionales según el rol */}
            {role === "admin" && (
              <li>
                <Link to="/usuarios" onClick={toggleMenu}>Usuarios</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/home">Iniciar Sesión</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
