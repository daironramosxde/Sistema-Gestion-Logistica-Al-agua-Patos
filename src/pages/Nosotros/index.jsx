import React from "react";
import "./Nosotros.css";
import Navbar from "../../components/Navbar";
import Contactenos from "../../components/Contactenos";

function Nosotros() {
    return (
        <div>
            <div>
            <Navbar /> {/* Agrega el Navbar */}
            {/* Sección principal con fondo e introducción */}
            </div>
            {/* Sección Sobre Nosotros */}
            <div className="sobre-nosotros">
                <h2>Sobre Nosotros</h2>
                <p>
                    En Restaurante Al Agua Patos, nos enorgullece ofrecer una experiencia culinaria única que celebra lo mejor de la cocina colombiana con un toque moderno.
                    Desde nuestros inicios en 2010, hemos crecido hasta convertirnos en uno de los destinos gastronómicos más queridos en la ciudad,
                    reconocido por nuestros ingredientes frescos, recetas tradicionales y un ambiente acogedor.
                </p>
                <p>
                    Nuestro equipo está comprometido con la excelencia en cada plato que servimos y en la experiencia general que brindamos a nuestros clientes.
                    Creemos en el poder de la comida para unir a las personas y crear momentos memorables.
                </p>
                <img
                    src="ruta-a-tu-imagen.jpg"
                    alt="Equipo del Restaurante"
                    className="imagen-equipo"
                />
            </div>

            {/* Sección Nuestros Valores */}
            <div className="valores">
                <div className="valor">
                    <h3>Calidad</h3>
                    <p>
                        Nos aseguramos de utilizar los ingredientes más frescos y de la más alta calidad en todos nuestros platos.
                    </p>
                </div>
                <div className="valor">
                    <h3>Innovación</h3>
                    <p>
                        Nos esforzamos por reinventar la cocina tradicional colombiana con nuevas técnicas y sabores.
                    </p>
                </div>
                <div className="valor">
                    <h3>Servicio</h3>
                    <p>
                        Creemos en la importancia de brindar un servicio excepcional que haga que nuestros clientes se sientan como en casa.
                    </p>
                </div>
            </div>

            {/* Sección Contactenos */}
            <Contactenos />
        </div>
    );
}

export default Nosotros;
