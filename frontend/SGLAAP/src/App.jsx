import { useRoutes, BrowserRouter as Rutas } from "react-router-dom";
import Inicio from "../src/pages/Inicio";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import UserBar from "./components/UserBar";
import Recursos from "../src/pages/Recursos";
import Empleados from "../src/pages/Empleados";
import Areas from "./pages/Areas";
import Ausencias from "./pages/Ausencias";
import NotFoundPage from "../src/pages/NotFound";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "/Recursos", element: <Recursos /> },
    { path: "/Empleados", element: <Empleados /> },  // Corregido: 'elemnt' a 'element'
    { path: "/Ausencias", element: <Ausencias /> },
    { path: "/Areas", element: <Areas /> },  // Corregido: 'elemnt' a 'element'
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
