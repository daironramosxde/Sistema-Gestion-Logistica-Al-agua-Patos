import React, { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; // Necesitarás instalar esto con npm install jwt-decode
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setRole(decodedToken.nombre_rol);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setRole(decodedToken.nombre_rol);
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/home"); // Usamos useNavigate para redirigir
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
