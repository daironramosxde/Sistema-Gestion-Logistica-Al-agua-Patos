import React from "react";
import Navbar from "../../components/Navbar"; // Importa el Navbar
import "./Home.css"; // Archivo de estilos para Home

function Home() {
  return (
    <div className="home-page">
      <Navbar /> {/* Agrega el Navbar */}

      {/* Sección principal con fondo e introducción */}
      <div className="main-content">
        <h1>Bienvenido a SGL AAP</h1>
        <p>Esta es la página principal de tu nueva aplicación.</p>
      </div>

      {/* Sección de productos */}
      <section className="products-section">
        <h2>Nuestros Productos</h2>
        <div className="products-container">
          <div className="product-card">
            <h3>Producto 1</h3>
            <p>Descripción breve del producto.</p>
          </div>
          <div className="product-card">
            <h3>Producto 2</h3>
            <p>Descripción breve del producto.</p>
          </div>
          <div className="product-card">
            <h3>Producto 3</h3>
            <p>Descripción breve del producto.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
