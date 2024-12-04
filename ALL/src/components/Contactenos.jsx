import React from "react";
import "./Contactenos.css";

function Contactenos() {
    return (
        <div className="contactenos">
            <h2>Contáctenos</h2>
            <div className="contacto-contenedor">
                {/* Formulario de Contacto */}
                <div className="formulario-contacto">
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" placeholder="Escribe tu nombre" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Escribe tu correo electrónico"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mensaje">Mensaje:</label>
                            <textarea
                                id="mensaje"
                                placeholder="Escribe tu mensaje aquí"
                                rows="4"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-enviar">
                            Enviar
                        </button>
                    </form>
                </div>

                {/* Información de Contacto */}
                <div className="informacion-contacto">
                    <h3>Información de Contacto</h3>
                    <p>
                        <strong>Dirección:</strong> Calle 72 #5 - 22, Bogotá, Colombia
                    </p>
                    <p>
                        <strong>Teléfono:</strong> +57 1 2345678
                    </p>
                    <p>
                        <strong>Correo Electrónico:</strong> info@agua-patos.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Contactenos;
