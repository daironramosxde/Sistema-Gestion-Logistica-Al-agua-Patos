import React from "react";
import "./Features.css";

function Features() {
const features = [
    { title: "Gestión de Recursos", description: "Administra tus recursos fácilmente." },
    { title: "Optimización de Procesos", description: "Automatiza tareas y ahorra tiempo." },
    { title: "Soporte Técnico", description: "Resuelve tus dudas con nuestro equipo." },
];

return (
    <section className="features">
    <h2>Características Principales</h2>
    <div className="features-list">
        {features.map((feature, index) => (
        <div className="feature" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
        </div>
        ))}
    </div>
    </section>
);
}

export default Features;
