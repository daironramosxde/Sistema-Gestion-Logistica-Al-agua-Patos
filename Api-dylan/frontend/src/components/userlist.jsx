import { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const consultarUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users"); // URL del backend
        setListaUsuarios(response.data);
      } catch (error) {
        console.error("Ocurrió un error al consultar los usuarios:", error);
      }
    };
    consultarUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`); // URL del backend
      setListaUsuarios(listaUsuarios.filter((usuario) => usuario._id !== id));
      alert("El usuario fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className="container text-center mb-3">
      <h4 className="bg-light">Lista de Usuarios</h4>
      <hr />
      <table className="table table-sm">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Usuario</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((usuario) => (
            <tr key={usuario._id}>
              <th scope="row">{usuario._id}</th>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => console.log("Editar Usuario", usuario)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarUsuario(usuario._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
