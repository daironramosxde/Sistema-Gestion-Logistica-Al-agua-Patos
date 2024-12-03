import { useEffect, useState } from "react";
import axios from "axios";

function RolList() {
    const [listaRoles, setListaRoles] = useState([]);

    useEffect(() => {
        const consultarRoles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/rol"); // URL del backend
                setListaRoles(response.data);
            } catch (error) {
                console.error("Ocurrio un error al consultar los roles:", error);
            }
        };

        consultarRoles();
    }, []);

    const eliminarRol = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/rol/${id}`); // URL del backend
            setListaRoles(listaRoles.filter((rol) => rol._id !== id));
            alert("El rol fue eliminado con exito");
        } catch (error) {
            console.error("Error al eliminar el rol:", error);
        }
    }

    return (
        <div className="container text-center mb-3">
            <h4 className="bg-light">Lista de Roles</h4>
            <hr />
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Rol</th>
                        <th scope="col">descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {listaRoles.map((rol) => (
                        <tr key={rol._id}>
                            <td>{rol._id}</td>
                            <td>{rol.nombre}</td>
                            <td>{rol.descripcion}</td>
                            <td>
                                <button className="btn btn-primary"
                                >Editar</button>
                                <button className="btn btn-danger"
                                 onClick={() => eliminarRol(rol._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RolList;