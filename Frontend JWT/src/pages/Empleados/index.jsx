import React from 'react'
import EmpleadosCrud from '../../components/EmpleadosCrud';
import "../css/crud.css";

function Empleados() {
    return (
        <div>
        <header>
            <h1>Gestion de Empleados</h1>
        </header>
        <div>
            <EmpleadosCrud/>{}
        </div>
        </div>
    );
    }

export default Empleados