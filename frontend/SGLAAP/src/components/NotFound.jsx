import React from "react";
import { Link } from "react-router-dom";

function NotFound({ message = "Página no encontrada" }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>{message}</p>
      <Link to="/" style={styles.link}>
        Volver al inicio
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "10%",
    padding: "20px",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "5rem",
    color: "#ff6b6b",
  },
  message: {
    fontSize: "1.5rem",
    margin: "20px 0",
  },
  link: {
    fontSize: "1.2rem",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default NotFound;
