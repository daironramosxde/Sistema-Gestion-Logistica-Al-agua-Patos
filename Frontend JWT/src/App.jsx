import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer";
import UserBar from "./components/UserBar";
import Inicio from "./pages/Inicio";
import Recursos from "./pages/Recursos";
import Empleados from "./pages/Empleados";
import Ausencias from "./pages/Ausencias";
import Areas from "./pages/Areas";
import Usuarios from "./pages/Usuarios";
import Horarios from "./pages/Horarios";
import Eventos from "./pages/evento";
import Cliente from "./pages/cliente";
import NotFoundPage from "./pages/NotFound";

const AppRoutes = () => {
  const { isAuthenticated, role } = useContext(AuthContext); // Acceso a autenticación y rol

  // Define las rutas permitidas según el rol
  const rutas = [
    { path: "/", element: <Inicio /> },
    { path: "/Recursos", element: <Recursos /> },
    { path: "/Empleados", element: <Empleados /> },
    { path: "/Ausencias", element: <Ausencias /> },
    { path: "/Areas", element: <Areas /> },
    { path: "/Usuarios", element: <Usuarios /> },
    { path: "/Horarios", element: <Horarios /> },
    { path: "/Eventos", element: <Eventos /> },
    { path: "/Clientes", element: <Cliente /> },
    { path: "*", element: <NotFoundPage /> },
  ];

  // Filtra las rutas según autenticación y rol
  const rutasFiltradas = isAuthenticated
    ? rutas // En este caso no hay restricciones de rol, pero aquí podrías filtrarlas
    : [{ path: "/", element: <Inicio /> }];

  return (
    <Routes>
      {rutasFiltradas.map((ruta, index) => (
        <Route key={index} path={ruta.path} element={ruta.element} />
      ))}
    </Routes>
  );
};

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext); // Acceso al contexto para logout

  return (
    <Router>
      <AuthProvider>
        <div className="scrollable-container">
          {/* Navbar solo si el usuario está autenticado */}
          {isAuthenticated && <Navbar />}

          {/* Barra de usuario */}
          {isAuthenticated && <UserBar username="Usuario123" onLogout={logout} />}

          {/* Rutas de la aplicación */}
          <AppRoutes />

          {/* Footer siempre visible */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

