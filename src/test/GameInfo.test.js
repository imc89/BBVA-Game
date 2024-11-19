// GameInfo.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import GameInfo from '../components/GameInfo/GameInfo';  // Ajusta la ruta según tu estructura de carpetas.

describe('GameInfo Component', () => {
  
  test('Debe renderizar el componente correctamente con las props de puntaje', () => {
    const score = 10;
    const maxScore = 20;
    
    render(<GameInfo score={score} maxScore={maxScore} />);
    
    // Verificar que el puntaje actual y el puntaje máximo están renderizados correctamente
    expect(screen.getByText(`Puntaje: ${score}`)).toBeInTheDocument();
    expect(screen.getByText(`Puntaje Máximo: ${maxScore}`)).toBeInTheDocument();
  });

  test('Debe renderizar los valores correctos cuando las props son diferentes', () => {
    const score = 5;
    const maxScore = 15;
    
    render(<GameInfo score={score} maxScore={maxScore} />);
    
    // Verificar que los valores se actualizan correctamente según las nuevas props
    expect(screen.getByText(`Puntaje: ${score}`)).toBeInTheDocument();
    expect(screen.getByText(`Puntaje Máximo: ${maxScore}`)).toBeInTheDocument();
  });

  test('Debe manejar valores por defecto', () => {
    // Aquí puedes probar si tu componente funciona bien cuando no se pasan las props
    render(<GameInfo score={0} maxScore={0} />);
    
    expect(screen.getByText('Puntaje: 0')).toBeInTheDocument();
    expect(screen.getByText('Puntaje Máximo: 0')).toBeInTheDocument();
  });
});

