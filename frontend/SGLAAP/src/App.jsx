import { BrowserRouter as Rutas, useRoutes } from "react-router-dom";
import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";
import Empleados from "../src/pages/Empleados";
import Inicio from "../src/pages/Inicio";
import NotFoundPage from "../src/pages/NotFound";
import Recursos from "../src/pages/Recursos";
import UserBar from "./components/UserBar";
import Areas from "./pages/Areas";
import Ausencias from "./pages/Ausencias";
import Usuarios from "./pages/Usuarios";
import Horarios from "./pages/Horarios";
import Eventos  from "./pages/evento";
import Cliente from "./pages/cliente";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "/Recursos", element: <Recursos /> },
    { path: "/Empleados", element: <Empleados /> },  // Corregido: 'elemnt' a 'element'
    { path: "/Ausencias", element: <Ausencias /> },
    { path: "/Areas", element: <Areas /> },  // Corregido: 'elemnt' a 'element'
    { path: "/Usuarios", element: <Usuarios /> },
    { path: "/Horarios", element: <Horarios /> },  
    { path: "/Eventos", element: <Eventos /> },
    { path: "/Clientes", element: <Cliente /> },  // Corregido: 'elemnt' a 'element'    // Corregido: 'elemnt' a 'element'
    { path: "*", element: <NotFoundPage /> }, ]); // Corregido: 'elemnt' a 'element", element: <Areas /> }, />  ]);
  return routes;
};

function App() {
  const handleLogout = () => {
    console.log("Cerrar sesión");
  };
  return (
    <>
      <div className="scrollable-container">
        <Rutas>
          <Navbar />
          <UserBar username="Usuario123" onLogout={handleLogout} />
          <AppRoutes />
          <Footer />
        </Rutas>
      </div>
    </>
  );
}

export default App;
