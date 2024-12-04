import { useEffect, useState } from "react";
import axios from "axios";

function HorariosCrud() {
  const [listaHorarios, setListaHorarios] = useState([]);
  const [horarioEditado, setHorarioEditado] = useState(null);
  const [nuevoHorario, setNuevoHorario] = useState({
    id_empleado: "",
    dia_semana: "",
    hora_entrada: "",
    hora_salida: "",
  });
  const [empleados, setEmpleados] = useState([]);
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  useEffect(() => {
    const consultarHorarios = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/horarios");
        setListaHorarios(response.data);
      } catch (error) {
        console.error("Error al consultar horarios: ", error);
      }
    };

    const consultarEmpleados = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/empleados");
        setEmpleados(response.data);
      } catch (error) {
        console.error("Error al consultar empleados: ", error);
      }
    };

    consultarHorarios();
    consultarEmpleados();
  }, []);

  const actualizarHorario = (_id) => {
    const horario = listaHorarios.find((h) => h._id === _id);
    setHorarioEditado(horario);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/horarios/${horarioEditado._id}`,
        horarioEditado
      );
      setListaHorarios((prev) =>
        prev.map((horario) =>
          horario._id === horarioEditado._id ? response.data : horario
        )
      );
      setHorarioEditado(null);
      alert("Horario actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el horario:", error);
    }
  };

  const borrarHorario = async (_id) => {
    try {
      await axios.delete(`http://localhost:9000/api/horarios/${_id}`);
      setListaHorarios(listaHorarios.filter((horario) => horario._id !== _id));
      alert("El horario fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el horario:", error);
    }
  };

  const agregarHorario = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/horarios", nuevoHorario);
      setListaHorarios((prev) => [...prev, response.data]);
      setNuevoHorario({
        id_empleado: "",
        dia_semana: "",
        hora_entrada: "",
        hora_salida: "",
      });
      alert("Horario agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el horario:", error);
    }
  };

  return (
    <div className="container-todo">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Empleado</th>
            <th>Día</th>
            <th>Hora Entrada</th>
            <th>Hora Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaHorarios.map((horario, index) => (
            <tr key={horario._id || index}>
              <td>{horario._id || "N/A"}</td>
              <td>{horario.id_empleado?.nombre || "Desconocido"}</td>
              <td>{horario.dia_semana || "Sin día"}</td>
              <td>{horario.hora_entrada || "Sin hora"}</td>
              <td>{horario.hora_salida || "Sin hora"}</td>
              <td>
                <button className="btn btn-info" onClick={() => actualizarHorario(horario._id)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => borrarHorario(horario._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container-agregar">
        <h4>Agregar Nuevo Horario</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarHorario();
          }}
        >
          <div className="mb-3">
            <label htmlFor="idEmpleado" className="form-label">Empleado:</label>
            <select
              className="form-control"
              id="idEmpleado"
              value={nuevoHorario.id_empleado}
              onChange={(e) =>
                setNuevoHorario({ ...nuevoHorario, id_empleado: e.target.value })
              }
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map((empleado) => (
                <option key={empleado._id} value={empleado._id}>
                  {empleado.nombre} {empleado.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="diaSemana" className="form-label">Día:</label>
            <select
              className="form-control"
              id="diaSemana"
              value={nuevoHorario.dia_semana}
              onChange={(e) =>
                setNuevoHorario({ ...nuevoHorario, dia_semana: e.target.value })
              }
              required
            >
              <option value="">Seleccione un día</option>
              {diasSemana.map((dia) => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="horaEntrada" className="form-label">Hora Entrada:</label>
            <input
              type="time"
              className="form-control"
              id="horaEntrada"
              value={nuevoHorario.hora_entrada}
              onChange={(e) =>
                setNuevoHorario({ ...nuevoHorario, hora_entrada: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="horaSalida" className="form-label">Hora Salida:</label>
            <input
              type="time"
              className="form-control"
              id="horaSalida"
              value={nuevoHorario.hora_salida}
              onChange={(e) =>
                setNuevoHorario({ ...nuevoHorario, hora_salida: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </div>
      {horarioEditado && (
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Horario</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setHorarioEditado(null)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="idEmpleadoEdit" className="form-label">Empleado:</label>
                  <select
                    className="form-control"
                    id="idEmpleadoEdit"
                    value={horarioEditado.id_empleado}
                    onChange={(e) =>
                      setHorarioEditado({
                        ...horarioEditado,
                        id_empleado: e.target.value,
                      })
                    }
                  >
                    <option value="">Seleccione un empleado</option>
                    {empleados.map((empleado) => (
                      <option key={empleado._id} value={empleado._id}>
                        {empleado.nombre} {empleado.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="diaSemanaEdit" className="form-label">Día:</label>
                  <select
                      className="form-control"
                      id="diaSemanaEdit"
                      value={nuevoHorario.dia_semana}
                      onChange={(e) =>
                        setNuevoHorario({ ...nuevoHorario, dia_semana: e.target.value })
                      }
                      required
                    >
                      <option value="">Seleccione un día</option>
                      {diasSemana.map((dia) => (
                        <option key={dia} value={dia}>{dia}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="horaEntradaEdit" className="form-label">Hora Entrada:</label>
                  <input
                    type="time"
                    className="form-control"
                    id="horaEntradaEdit"
                    value={horarioEditado.hora_entrada}
                    onChange={(e) =>
                      setHorarioEditado({
                        ...horarioEditado,
                        hora_entrada: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="horaSalidaEdit" className="form-label">Hora Salida:</label>
                  <input
                    type="time"
                    className="form-control"
                    id="horaSalidaEdit"
                    value={horarioEditado.hora_salida}
                    onChange={(e) =>
                      setHorarioEditado({
                        ...horarioEditado,
                        hora_salida: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setHorarioEditado(null)}
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={guardarCambios}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default HorariosCrud;
