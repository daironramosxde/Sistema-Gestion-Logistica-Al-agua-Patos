import React from 'react'
import EmpleadosCrud from '../../components/EmpleadosCrud';

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
