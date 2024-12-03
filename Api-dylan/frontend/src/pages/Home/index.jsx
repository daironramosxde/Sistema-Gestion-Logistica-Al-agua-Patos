import React from "react";
import Navbar from "../../components/Navbar"; // Importa el componente Navbar

function Home() {
  return (
    <div>
      <Navbar /> {/* Muestra el encabezado */}
      <main style={{ padding: "20px" }}>
        <h1>Bienvenido a SGL AAP</h1>
        <p>Esta es la página principal de la aplicación.</p>
      </main>
    </div>
  );
}

export default Home;
