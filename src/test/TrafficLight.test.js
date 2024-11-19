import { render, screen } from '@testing-library/react';
import TrafficLight from '../components/TrafficLight/TrafficLight';

describe('TrafficLight', () => {
  test('Debe mostrar luz verde cuando la variable isGreenLight es true', () => {
    render(<TrafficLight isGreenLight={true} />);
  });

  test('Debe mostrar luz roja cuando la variable isGreenLight es false', () => {
    render(<TrafficLight isGreenLight={false} />);
  });
});
