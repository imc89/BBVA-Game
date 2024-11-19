import React from 'react';
import './TrafficLight.css'
const TrafficLight = ({ isGreenLight }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <div
        id="light"
        style={{
          backgroundColor: isGreenLight ? 'green' : 'red', // Cambia el color del semáforo según el estado.
        }}
      ></div>
    </div>
  );
};

export default TrafficLight;
