import React from 'react'
import "../css/crud.css";
import AusenciasCrud from '../../components/AusenciasCrud';

function Ausencias() {
    return (
        <div>
        <header>
            <h1>Gestion de Ausencias</h1>
        </header>
        <div>
            <AusenciasCrud/>{}
        </div>
        </div>
    );
    }

export default Ausencias