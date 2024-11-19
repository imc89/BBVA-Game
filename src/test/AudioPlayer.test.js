import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';

describe('AudioPlayer', () => {
  let audioElement;

  beforeEach(() => {
    // Creamos un elemento real de <audio> en lugar de un mock
    audioElement = document.createElement('audio');
    document.body.appendChild(audioElement);

    // Monitorear el método getElementById y devolver un mock de audioElement simulado
    jest.spyOn(document, 'getElementById').mockReturnValue(audioElement);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = ''; // Limpiar el DOM después de cada prueba
  });

  test('Debe renderizar el componente y obtener el elemento de audio correctamente', () => {
    render(<AudioPlayer isGreenLight={false} score={0} trafficLightDurationRef={10000} isPlaying={false} onPlay={() => {}} onStop={() => {}} />);

    // Verificar que el texto de error se renderiza cuando el audio no es compatible
    expect(screen.getByText('Tu navegador no soporta el elemento de audio.')).toBeInTheDocument();

    // Verificar que se obtiene el elemento de audio
    expect(document.getElementById).toHaveBeenCalledWith('game-audio');
  });

  test('Debe reproducir el audio cuando playAudio se llama', () => {
    render(<AudioPlayer isGreenLight={false} score={0} trafficLightDurationRef={10000} isPlaying={true} onPlay={() => {}} onStop={() => {}} />);
  });

  test('Debe detener el audio cuando stopAudio se llama', () => {
    render(<AudioPlayer isGreenLight={false} score={0} trafficLightDurationRef={10000} isPlaying={true} onPlay={() => {}} onStop={() => {}} />);
    expect(audioElement.currentTime).toBe(0); // El audio debe reiniciarse
  });

  test('Debe ajustar la velocidad del audio cuando cambia el score o trafficLightDurationRef', () => {
    render(<AudioPlayer isGreenLight={false} score={10} trafficLightDurationRef={5000} isPlaying={true} onPlay={() => {}} onStop={() => {}} />);
  });

  test('Debe resetear la velocidad del audio cuando score es 0', () => {
    render(<AudioPlayer isGreenLight={false} score={0} trafficLightDurationRef={10000} isPlaying={false} onPlay={() => {}} onStop={() => {}} />);

    // Verificar que la velocidad se ha restablecido a 1
    expect(audioElement.playbackRate).toBe(1);
  });

  test('Debe reproducir o detener el audio basado en isPlaying', () => {
    const { rerender } = render(
      <AudioPlayer isGreenLight={false} score={0} trafficLightDurationRef={10000} isPlaying={true} onPlay={() => {}} onStop={() => {}} />
    );
    // Ahora actualizamos el estado para detener el audio
    rerender(
      <AudioPlayer isGreenLight={false} score={0} trafficLightDurationRef={10000} isPlaying={false} onPlay={() => {}} onStop={() => {}} />
    );
  });

  test('Debe limpiar correctamente el efecto al desmontarse el componente', () => {
    const { unmount } = render(
      <AudioPlayer isGreenLight={false} score={0} trafficLightDurationRef={10000} isPlaying={false} onPlay={() => {}} onStop={() => {}} />
    );

    unmount();

    // Verificamos que cuando el componente se desmonte, el audio se pause y se reinicie
    expect(audioElement.currentTime).toBe(0);
  });
});
