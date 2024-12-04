import React from 'react'
import RecursoCrud from '../../components/RecursoCrud';
import "../css/crud.css";

function Recursos() {
    return (
        <div>
            <header>
                <h1>Gestion de Recursos</h1>
            </header>
            <div id='recursoCrud'>
                <RecursoCrud/>{}
            </div>
        </div>
    );
    }

export default Recursos
