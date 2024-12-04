import React from 'react'
import AreaCrud from '../../components/AreasCrud';
import "../css/crud.css"


function Areas() {
    return (
        <div>
        <header>
            <h1>Gestion de Area</h1>
        </header>
        <div>
            <AreaCrud/>{}
        </div>
        </div>
    );
    }

export default Areas;
