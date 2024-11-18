import React, { useState, useEffect } from 'react';
// Hook para navegar a otras rutas de la aplicación.
import { useNavigate } from 'react-router-dom';
// Importa el componente RankingTable, que muestra la tabla de clasificación.
import RankingTable from './components/RankingTable/RankingTable';

const Home = () => {
  // Estado para almacenar el nombre del jugador.
  const [userName, setUserName] = useState('');
  // Hook para navegar programáticamente a otra ruta.
  const navigate = useNavigate();
  // Estado para almacenar la lista de jugadores y sus puntajes.
  const [ranking, setRanking] = useState([]);

  //Este efecto se ejecuta una sola vez cuando el componente se monta 
  //para cargar y ordenar los datos de los jugadores desde localStorage.
  useEffect(() => {
    // Si no hay datos, se inicializa como un objeto vacío.
    const playersData = JSON.parse(localStorage.getItem('players')) || {};
    const sortedPlayers = Object.keys(playersData)
      // Convierte los datos del localStorage en un array de objetos.
      .map((key) => ({ name: key, ...playersData[key] }))
      // Ordenar por puntaje máximo de forma descendente
      .sort((a, b) => b.maxScore - a.maxScore);
    // Establece el ranking ordenado en el estado.
    setRanking(sortedPlayers);
  }, []);  // Segundo argumento de useEffect, el array vacío asegura que solo se ejecute una vez al no especificar cambios.

  const handleStartGame = () => {
    // Verifica si el nombre no está vacío o solo contiene espacios.
    if (!userName.trim()) {
      alert('Por favor, ingresa un nombre válido');
      return;
    }

    // Verificar si el jugador ya existe en el localStorage.
    const playersData = JSON.parse(localStorage.getItem('players')) || {};
    const existingPlayer = playersData[userName];

    // Si el jugador existe, pasa el puntaje y maxScore guardados al juego.
    if (existingPlayer) {
      navigate('/game', { state: { userName, score: existingPlayer.score, maxScore: existingPlayer.maxScore } });
    } else {
      // Si es un jugador nuevo, iniciar el juego desde cero
      navigate('/game', { state: { userName, score: 0, maxScore: 0 } });
    }
  };

  return (
    <div>
      <h1>Bienvenido al Juego</h1>
      <div>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={userName}
          onChange={(e) => setUserName(e.target.value)} // Actualiza el nombre del jugador con cada cambio en el input.
        />
        <button className="start" onClick={handleStartGame}>Iniciar Juego</button>
      </div>

      {/* Muestra el componente RankingTable con los jugadores ordenados */}
      <RankingTable ranking={ranking} />
    </div>
  );
};

export default Home;
