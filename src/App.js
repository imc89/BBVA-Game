// Importa la librería de React para poder crear componentes.
import React from 'react';
// Importa los componentes necesarios de React Router para manejar las rutas de la aplicación.
import { Routes, Route, Navigate } from 'react-router-dom';
// Importa el componente Home, que es la página de inicio.
import Home from './Home';
// Importa el componente Game, que es la página del juego.
import Game from './Game';

function App() {
  return (
      <Routes>
        {/* Ruta principal: dirige a la página de inicio */}
        <Route path="/" element={<Home />} />
        {/* Ruta para el juego: cuando se accede a /game */}
        <Route path="/game" element={<Game />} />
        {/* Ruta para redirigir a la página de inicio si no existe la pagína */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App;
