import React from "react";
import Navbar from "../../components/Navbar";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <Navbar /> {/* Agrega el Navbar */}
      <div className="login-container">
        <h2>INICIO DE SESIÓN</h2>
        <form>
          <div className="login-input-container">
            <label htmlFor="email">Usuario</label>
            <input type="email" id="email" placeholder="Ingrese su usuario" />
          </div>
          <div className="login-input-container">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="Ingrese su contraseña" />
          </div>
          <button type="submit" className="login-submit-btn">Enviar</button>
        </form>
        <a href="#" className="forgot-password">¿Olvidó su contraseña?</a>
        <div className="login-roles">
          <p>ADMINISTRADOR</p>
          <p>EMPLEADO</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
