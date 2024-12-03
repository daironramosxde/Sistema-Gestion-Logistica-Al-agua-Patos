import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import App from './App'; // Componente principal de la aplicación
import './index.css'; // Estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      {/* Envuelve la aplicación completa con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

