import React, { useState, useEffect, useRef } from 'react';
// Hook para acceder a la ubicación actual y navegar entre rutas.
import { useLocation, useNavigate } from 'react-router-dom';

const Game = () => {
  // Devuelve el estado que se pasó cuando se navegó a la ruta actual a través de useLocation().
  const { state } = useLocation();
  // Obtiene el nombre del usuario desde el estado.
  const [userName] = useState(state.userName);



  return (
    <div>
      <h1>¡BUENA SUERTE EN EL JUEGO!</h1>
      <h2>JUGADOR: {userName.toUpperCase()}</h2>
    </div>
  );
};

export default Game;
