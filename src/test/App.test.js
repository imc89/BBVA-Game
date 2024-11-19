import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('renderizado del componente Home en la ruta  /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Bienvenido al Juego/i)).toBeInTheDocument();
  });

  test('redirección a Home cuando la ruta es inválida', () => {
    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Bienvenido al Juego/i)).toBeInTheDocument();
  });
});
