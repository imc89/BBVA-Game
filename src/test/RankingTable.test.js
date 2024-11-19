import React from 'react';
import { render, screen } from '@testing-library/react';
import RankingTable from '../components/RankingTable/RankingTable';

describe('RankingTable', () => {

  it('Debe renderizar el título de la tabla correctamente', () => {
    render(<RankingTable ranking={[]} />);  // Pasamos un ranking vacío para este test
    const title = screen.getByText('RANKING');
    expect(title).toBeInTheDocument();
  });

  it('Debe renderizar correctamente las cabeceras de la tabla', () => {
    render(<RankingTable ranking={[]} />);
    expect(screen.getByText('Jugador')).toBeInTheDocument();
    expect(screen.getByText('Puntaje Máximo')).toBeInTheDocument();
  });

  it('Debe renderizar las filas de jugadores cuando hay datos', () => {
    const rankingData = [
      { name: 'Jugador 1', maxScore: 100 },
      { name: 'Jugador 2', maxScore: 150 }
    ];
    
    render(<RankingTable ranking={rankingData} />);
    
    // Verificar que los nombres y puntajes están presentes
    expect(screen.getByText('Jugador 1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Jugador 2')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('Debe renderizar correctamente cuando el ranking está vacío', () => {
    render(<RankingTable ranking={[]} />);
    
    // Verificar que no hay filas adicionales
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1); // Solo debería estar la fila de encabezado
  });

});
