import axios from "axios";
import { useEffect, useState } from "react";

function UsuariosCrud() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaRoles, setListaRoles] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "",
  });

  useEffect(() => {
    const consultarDatos = async () => {
      try {
        const [usuariosResponse, rolesResponse] = await Promise.all([
          axios.get("http://localhost:9000/api/users"),
          axios.get("http://localhost:9000/api/rol"),
        ]);
        setListaUsuarios(usuariosResponse.data);
        setListaRoles(rolesResponse.data);
      } catch (error) {
        console.error("Ocurrió un error al consultar los datos: ", error);
      }
    };
    consultarDatos();
  }, []);

  const actualizarUsuario = (_id) => {
    const usuario = listaUsuarios.find((u) => u._id === _id);
    setUsuarioEditado(usuario);
  };

  const guardarCambios = async () => {
    console.log("Datos enviados a la API:", usuarioEditado); // Verifica los datos
  
    if (!usuarioEditado.nombre || !usuarioEditado.email || !usuarioEditado.rol) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:9000/api/users/${usuarioEditado._id}`,
        usuarioEditado
      );
      console.log("Respuesta de la API:", response.data);
      setListaUsuarios((prev) =>
        prev.map((usuario) =>
          usuario._id === usuarioEditado._id ? response.data : usuario
        )
      );
      setUsuarioEditado(null);
      alert("Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.response?.data || error);
      alert("Ocurrió un error al actualizar el usuario.");
    }
  };
  



  const borrarUsuario = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/users/${_id}`);
      setListaUsuarios(listaUsuarios.filter((usuario) => usuario._id !== _id));
      alert("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const agregarUsuario = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/users",
        nuevoUsuario
      );
      setListaUsuarios((prev) => [...prev, response.data]);
      setNuevoUsuario({
        nombre: "",
        email: "",
        password: "",
        rol: "",
      });
      alert("Usuario agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  return (
    <div className="container-todo">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((usuario, index) => (
            <tr key={usuario._id || index}>
              <th scope="row">{usuario._id}</th>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                {
                  listaRoles.find((rol) => rol._id === usuario.rol)?.nombre ||
                  "Sin rol"
                }
              </td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => actualizarUsuario(usuario._id)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => borrarUsuario(usuario._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-agregar">
        <h4>Agregar Nuevo Usuario</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarUsuario();
          }}
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nuevoUsuario.nombre}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={nuevoUsuario.email}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={nuevoUsuario.password}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Rol:
            </label>
            <select
              className="form-control"
              id="rol"
              value={nuevoUsuario.rol}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
              }
              required
            >
              <option value="">Seleccione un rol</option>
              {listaRoles.map((rol) => (
                <option key={rol._id} value={rol._id}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>
      {usuarioEditado && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuario</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setUsuarioEditado(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      value={usuarioEditado.nombre}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={usuarioEditado.email}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rol" className="form-label">
                      Rol
                    </label>
                    <select
                      className="form-control"
                      id="rol"
                      value={usuarioEditado.rol}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          rol: e.target.value,
                        })
                      }
                    >
                      {listaRoles.map((rol) => (
                        <option key={rol._id} value={rol._id}>
                          {rol.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setUsuarioEditado(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={guardarCambios}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosCrud;
