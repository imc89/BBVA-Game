import React from 'react';

const RankingTable = ({ ranking }) => {
  return (
    <div>
      {/* Título de la tabla de clasificación. */}
      <h2>RANKING</h2>
      {/* Crea una tabla para mostrar los jugadores. */}
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Puntaje Máximo</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapea los jugadores del ranking y crea una fila para cada uno. */}
          {ranking.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.maxScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
