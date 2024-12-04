import React from 'react'
import ClientesCrud from '../../components/ClienteCrud.jsx';
import "../css/crud.css";

function Cliente() {
    return (
        <div>
        <header>
            <h1>Gestion de Clientes</h1>
        </header>
        <div>
            <ClientesCrud/>{}
        </div>
        </div>
    );
    }

export default Cliente