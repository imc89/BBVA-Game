import React, { useState, useEffect, useRef } from 'react';
// Hook para acceder a la ubicación actual y navegar entre rutas.
import { useLocation, useNavigate } from 'react-router-dom';
// Importa el componente para el semáforo.
import TrafficLight from './components/TrafficLight/TrafficLight';

// Importa el archivo de estilos de la aplicación.
import './App.css';

const Game = () => {
  // Devuelve el estado que se pasó cuando se navegó a la ruta actual a través de useLocation().
  const { state } = useLocation();
  // Hook para navegar a otras rutas de la aplicación.
  const navigate = useNavigate();

  // Inicializar score y maxScore con los valores del localStorage
  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem('score');
    // Si no hay puntaje guardado, comienza desde 0.
    return storedScore ? parseInt(storedScore, 10) : 0;
  });

  // Obtiene el nombre del usuario desde el estado.
  const [userName] = useState(state.userName);

  // Inicialización del puntaje máximo (maxScore) con los datos de localStorage.
  const [maxScore, setMaxScore] = useState(() => {
    // Verificar si hay usuarios que ya han jugado al juego.
    if (localStorage.players) {
      //Guarda datos de los usuarios.
      const playersData = JSON.parse(localStorage.getItem('players'));
      // Verificar si el jugador actual está dentro de los usuarios que ya han jugado.
      if (playersData[userName]) {
        return playersData[userName].maxScore; // Si el jugador existe, obtiene su puntaje máximo.
      }
    }
    return 0; // Si no existe el jugador, establece maxScore a 0.
  });

  // Estado para registrar el último botón presionado.
  const [lastButtonPressed, setLastButtonPressed] = useState(null);
  // Estado para controlar si la luz está verde o roja.
  const [isGreenLight, setIsGreenLight] = useState(false);
  // Estado para saber si el juego ha comenzado.
  const [hasStarted, setHasStarted] = useState(false);

  // Referencia para almacenar la duración del semáforo.
  const trafficLightDurationRef = useRef(0);
  // Referencia para almacenar el timeout del semáforo.
  const timeoutRef = useRef(null);


  // Función para cambiar el color del semáforo (verde o rojo).
  const changeTrafficLightColor = () => {
    // Alterna entre verde y rojo.
    setIsGreenLight((prev) => !prev);
    // Limpia el timeout anterior.
    clearTimeout(timeoutRef.current);
    // Vuelve a cambiar el color después de un tiempo teniendo en cuenta los 3 segundos del rojo.
    timeoutRef.current = setTimeout(changeTrafficLightColor, isGreenLight ? trafficLightDurationRef.current : 3000);
  };

  // Efecto para actualizar la duración del semáforo según el puntaje.
  useEffect(() => {
    // Calcula la duración del semáforo verde.
    const greenLightDuration = Math.max(10000 - score * 100, 2000) + Math.random(-1500, 1500);
    // Almacena la duración calculada.
    trafficLightDurationRef.current = greenLightDuration;
  }, [score]);

  // Maneja los clics en los botones (izquierda y derecha).
  const handleWalkButtonClick = (button) => {
    // Verifica si la luz está verde.
    let isGreen = document.querySelector('#light').style.backgroundColor === 'green';
    if (isGreen) {
      if (lastButtonPressed !== button) {
        setScore((prevScore) => {
          // Aumenta el puntaje si el botón presionado no es el mismo que el anterior.
          const newScore = prevScore + 1;

          // Actualiza el puntaje máximo si es necesario.
          setMaxScore((prevMaxScore) => {
            if (newScore > prevMaxScore) {
              const updatedMaxScore = newScore;
              // Guarda el nuevo puntaje máximo en localStorage.
              localStorage.setItem('maxScore', updatedMaxScore);
              // Actualiza el maxScore en el estado.
              return updatedMaxScore;
            }
            return prevMaxScore;
          });
          // Guarda el nuevo puntaje en localStorage.
          localStorage.setItem('score', newScore);
          // Devuelve el nuevo puntaje.
          return newScore;
        });
      } else {
        // Penalización por presionar el mismo botón consecutivamente.
        setScore((prevScore) => Math.max(0, prevScore - 1));
        // Guarda el puntaje penalizado.
        localStorage.setItem('score', Math.max(0, score - 1));
      }
      // Establece el último botón presionado.
      setLastButtonPressed(button);
    } else {
      // Si la luz es roja, solo restablece el puntaje sin cambiar el maxScore.
      setScore(0);
      // Guarda el puntaje restablecido en localStorage.
      localStorage.setItem('score', 0);
    }
  };

  // Maneja los eventos de teclado para las flechas izquierda y derecha.
  const handleKeydown = (event) => {
    // Previene la acción predeterminada del navegador.
    event.preventDefault();

    if (!hasStarted) {
      // Marca el juego como comenzado.
      setHasStarted(true);
    }

    if (event.key === 'ArrowLeft') {
      // Llama a la función correspondiente para la flecha izquierda.
      handleWalkButtonClick('left');
    } else if (event.key === 'ArrowRight') {
      // Llama a la función correspondiente para la flecha derecha.
      handleWalkButtonClick('right');
    }
  };

  // Función para iniciar el juego y comenzar el ciclo del semáforo.
  const startGame = () => {
    // Reiniciar el score cuando se comienza una nueva partida
    setScore(0);
    // Guarda el puntaje reiniciado en localStorage.
    localStorage.setItem('score', 0);
    // Cambia el color del semáforo.
    changeTrafficLightColor();
    // Añade el evento de teclado.
    window.addEventListener('keydown', handleKeydown);
  };

  // Limpiar los timeouts y los eventos del teclado cuando el componente se desmonte
  useEffect(() => {
    // Inicia el juego cuando el componente se monta.
    startGame();

    return () => {
      // Limpia el timeout del semáforo.
      clearTimeout(timeoutRef.current);
      // Elimina el evento de teclado.
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []); // Este efecto se ejecuta solo una vez, al montar el componente.

  // Guarda los datos del jugador en localStorage cuando el usuario sale o recarga la página.
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveDataGame();
    };

    // Agregar el evento "beforeunload" para ejecutar la función al salir o recargar la página.
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Función de limpieza cuando el componente se desmonte (elimina el listener).
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [score, maxScore, userName]); // Esta función se ejecutará cada vez que cambien score, maxScore o userName.

  // Manejar la salida del juego y guardar los datos
  const handleExitGame = () => {
    saveDataGame();
    // Navegar de vuelta a la página de inicio (Home).
    navigate('/');
  };

  // Manejar el guardado de datos
  const saveDataGame = () => {
    // Obtener los datos de jugadores guardados en localStorage, o un objeto vacío si no existen.
    const savedPlayerData = JSON.parse(localStorage.getItem('players')) || {};
    // Guardar los puntajes del jugador actual.
    savedPlayerData[userName] = { score, maxScore };
    // Volver a guardar los datos actualizados de los jugadores en localStorage.
    localStorage.setItem('players', JSON.stringify(savedPlayerData));
  }

  return (
    <div>
      <h1>¡BUENA SUERTE EN EL JUEGO!</h1>
      <h2>JUGADOR: {userName.toUpperCase()}</h2>

      <div className='container-game'>
     
        {/* Componente del semáforo */}
        <TrafficLight isGreenLight={isGreenLight} />

        <div className="game-buttons">
          <button onClick={() => handleWalkButtonClick('left')}>Izquierda (←)</button>
          <button onClick={() => handleWalkButtonClick('right')}>Derecha (→)</button>
        </div>

        <div className="game-buttons">
          <button onClick={handleExitGame}>Salir</button>
        </div>
      </div>
    
    </div>
  );
};

export default Game;
