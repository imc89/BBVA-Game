import React from 'react';

const GameInfo = ({ score, maxScore }) => {
  return (
    <div className="game-info"> {/* Contenedor para mostrar la información del juego. */}
      <p className="score">Puntaje: {score}</p> {/* Muestra el puntaje actual. */}
      <p className="max-score">Puntaje Máximo: {maxScore}</p> {/* Muestra el puntaje máximo. */}
    </div>
  );
};

export default GameInfo;
