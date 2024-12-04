import React from "react";
import "./UserBar.css";

const UserBar = ({ username, onLogout }) => {
  return (
    <div className="user-bar">
      <div className="user-info">
        <span className="user-avatar">👤</span>
        <span className="user-name">{username}</span>
      </div>
      <div className="user-options">
        <button className="user-option">🔔 Notificaciones</button>
        <button className="user-option">⚙️ Configuración</button>
        <button className="user-option" onClick={onLogout}>
          🚪 Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserBar;
