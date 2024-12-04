import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from "react";
import Navbar from "../../components/Navbar"; // Importa el Navbar
import "./Home.css"; // Archivo de estilos para Home

function Home() {
  return (
    <div className="home-page">
      <Navbar /> {/* Agrega el Navbar */}

      {/* Carrusel con el texto superpuesto */}
      <div className="carousel-container">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="public/image1.jpg"
                className="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="public/image2.jpg"
                className="d-block w-100"
                alt="Slide 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="public/image4.jpeg"
                className="d-block w-100"
                alt="Slide 3"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Texto superpuesto al carrusel */}
        <div className="main-content">
          <h1>Bienvenido a SGL AAP</h1>
          <p>Esta es la página principal de tu nueva aplicación.</p>
        </div>
      </div>

      {/* Sección de productos */}
      <section className="products-section">
        <h2>Nuestros Productos</h2>
        <div className="products-container">
          <div className="product-card">
            <img src="public/NECIO.jpg" alt="Product 1" />
            <h3>Necio</h3>
            <p>Tostada con queso cheddar, tocineta crocante, huevo poché bañado en salsa de queso fundido.</p>
          </div>
          <div className="product-card">
            <img src="public/Pato.jpg" alt="Product 2" />
            <h3>Pato-Go Necio</h3>
            <p>Sandwich de queso cheddar, jamón y tocineta crocante.</p>
          </div>
          <div className="product-card">
            <img src="public/Mariachi.jpg" alt="Product 3" />
            <h3>Mariachi</h3>
            <p>Tostada con mozzarella, carne mole mexicano, sour cream, cebolla, pimiento, queso, pico de gallo.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
