import {useRoutes, BrowserRouter as Rutas} from "react-router-dom";
import Inicio from "../src/pages/Inicio";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Recursos from "../src/pages/Recursos";
import Empleados from "../src/pages/Empleados";
// import NotFound from "..src/pages/Notfound";

const AppRoutes =() =>{
  let routes = useRoutes([
    {path: "/", element:<Inicio/>},
    {path: "/Recursos", element:<Recursos/>},
    {path: "/Empleados", elemnt:<Empleados/>}
    // {path: "*", element:<NotFound/>},
  ]);
  return routes;
};

function App(){
  return(
    <>
      <div className="scrollable-container">
        <Rutas>
          <Navbar/>
          <AppRoutes/>
          <Footer/>
        </Rutas>
      </div>
    </>
  );
};

export default App;
