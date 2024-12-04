import React from 'react';
import UsuariosCrud from '../../components/UsuarioCrud';
import "../css/crud.css";

function Usuarios() {
    return (
        <div>
        <header>
            <h1>Gestion de Usuarios</h1>
        </header>
        <div>
            <UsuariosCrud/>{}
        </div>
        </div>
    );
    }

export default Usuarios