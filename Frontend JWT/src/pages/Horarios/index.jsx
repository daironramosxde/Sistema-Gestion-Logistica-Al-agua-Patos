import React from 'react'
import HorariosCrud from '../../components/HorariosCrud';
import "../css/crud.css";

function Horarios() {
    return (
        <div>
        <header>
            <h1>Gestion de Empleados</h1>
        </header>
        <div>
            <HorariosCrud/>{}
        </div>
        </div>
    );
    }

export default Horarios