import React from 'react';
import { useRoutes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/sidebar.jsx';
import UsersList from './components/UserList.jsx'; // Ejemplo de otro componente
import RolList from './components/RolList.jsx'; // Ejemplo de otro componente

const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/users", element: <UsersList /> },
    { path: "/roles", element: <RolList /> },
  ]);
};

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Al Agua Patos</h1>
        <nav className="app-nav">
          <Link to="/home">Inicio</Link>
          <Link to="/users">Usuarios</Link>
          <Link to="/roles">Roles</Link>
        </nav>
      </header>
      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
