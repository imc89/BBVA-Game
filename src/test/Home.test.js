import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import { BrowserRouter as Router } from 'react-router-dom';

// Simula localStorage para que podamos probar con datos sin depender de un entorno real.
beforeEach(() => {
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
});

describe('Home component', () => {
  test('Debe renderizar el input y el botón de inicio', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Verificar que el título y los elementos existen
    expect(screen.getByText('Bienvenido al Juego')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeInTheDocument();
    expect(screen.getByText('Iniciar Juego')).toBeInTheDocument();
  });

  test('Debe actualizar el nombre si el campo cambia', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const input = screen.getByPlaceholderText('Ingresa tu nombre');
    userEvent.type(input, 'Jugador1');

    expect(input.value).toBe('Jugador1');
  });

  test('Debe mostrar una alerta de campo vacio si se inicia el juego sin nombre', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const button = screen.getByText('Iniciar Juego');
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(button);

    expect(alertMock).toHaveBeenCalledWith('Por favor, ingresa un nombre válido');
  });

  test('Debe navegar a /game con el estado correcto', async () => {
    // Simulamos datos de jugadores en el localStorage
    const mockPlayers = {
      'Jugador1': { score: 100, maxScore: 200 }
    };
    Storage.prototype.getItem.mockReturnValueOnce(JSON.stringify(mockPlayers));

    render(
      <Router>
        <Home />
      </Router>
    );

    const input = screen.getByPlaceholderText('Ingresa tu nombre');
    userEvent.type(input, 'Jugador1');

    const button = screen.getByText('Iniciar Juego');    const originalNavigate = require('react-router-dom').useNavigate;

    userEvent.click(button);

  });

  test('Debe renderizar el componente RankingTable con los datos del localstorage', async () => {
    const mockPlayers = {
      'Jugador1': { score: 100, maxScore: 200 },
      'Jugador2': { score: 150, maxScore: 250 }
    };

    Storage.prototype.getItem.mockReturnValueOnce(JSON.stringify(mockPlayers));

    render(
      <Router>
        <Home />
      </Router>
    );

    // Esperar a que el efecto useEffect se ejecute y el ranking se actualice
    await waitFor(() => {
      expect(screen.getByText('Jugador2')).toBeInTheDocument();
      expect(screen.getByText('Jugador1')).toBeInTheDocument();
    });
  });
});
