// Importa React y hooks de estado y efecto.
import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ isGreenLight, score, trafficLightDurationRef, isPlaying, onPlay, onStop }) => {
  // Estado para almacenar el elemento de audio.
  const [audioElement, setAudioElement] = useState(null);

  // Este efecto se ejecuta una sola vez cuando el componente se monta.
  useEffect(() => {
    // Obtiene el elemento de audio por su ID.
    const audio = document.getElementById('game-audio');
    // Almacena el elemento de audio en el estado.
    setAudioElement(audio);

    // Función de limpieza que se ejecuta cuando el componente se desmonta.
    return () => {
      if (audio) {
        // Pausa el audio.
        audio.pause();
        // Restaura el tiempo del audio al inicio.
        audio.currentTime = 0;
      }
    };
  }, []);  // Segundo argumento de useEffect, el array vacío asegura que solo se ejecute una vez al no especificar cambios.

  // Función para reproducir el audio si no está en reproducción.
  const playAudio = () => {
    if (audioElement && !audioElement.paused) {
      // Si el audio ya está en reproducción, no hace nada.
      return;
    }
    if (audioElement) {
      // Reproduce el audio si no está pausado.
      audioElement.play();
    }
  };

  // Función para detener el audio y restablecer su tiempo al inicio.
  const stopAudio = () => {
    if (audioElement) {
      // Pausa el audio.
      audioElement.pause();
      // Restablece el tiempo del audio a 0.
      audioElement.currentTime = 0;
    }
  };

  // Este efecto ajusta la velocidad del audio basado en la duración del semáforo y el puntaje.
  useEffect(() => {
    if (audioElement && score > 0) {
      // Calcula el factor de velocidad desde 0,5 (mitad de velocidad) a 2 (doble de velocidad).
      const speedFactor = Math.max(0.5, 2 - trafficLightDurationRef / 10000);
      // Ajusta la velocidad del audio.
      audioElement.playbackRate = speedFactor;
    } else {
      // Si el puntaje es 0, restablece la velocidad.
      resetAudioSpeed();
    }
  }, [score, trafficLightDurationRef]); // Se ejecuta cada vez que cambia el puntaje o la duración del semáforo.

  // Función para restablecer la velocidad del audio a la normal.
  const resetAudioSpeed = () => {
    if (audioElement) {
      // Establece la velocidad de reproducción a 1.
      audioElement.playbackRate = 1.0;
      if (audioElement.paused) {
        // Reproduce el audio si estaba pausado.
        audioElement.play();
      }
    }
  };

  // Este efecto maneja el estado del audio basado en la variable 'isPlaying'.
  useEffect(() => {
    if (isPlaying) {
      // Reproduce el audio si el juego está en marcha.
      playAudio();
    } else {
      // Detiene el audio si el juego está detenido.
      stopAudio();
    }
  }, [isPlaying]); // Se ejecuta cuando cambia el estado de 'isPlaying'.
  return (
    <div>
      <audio id="game-audio" loop>
        <source src="/BBVA-Game/game-music.mp3" type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};

export default AudioPlayer;
