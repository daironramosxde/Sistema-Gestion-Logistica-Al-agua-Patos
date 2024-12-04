import React from 'react'
import EventosCrud from '../../components/EventosCrud.jsx';
import "../css/crud.css";

function Eventos() {
    return (
        <div>
        <header>
            <h1>Gestion de Eventos</h1>
        </header>
        <div>
            <EventosCrud/>{}
        </div>
        </div>
    );
    }

export default Eventos