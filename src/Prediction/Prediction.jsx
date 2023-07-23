import React from 'react';
import Canvas from './Canvas';

const Prediction = () => {
  return (
    <div className="m-3">
      <h3 className='pb-4 text-center'>Sketch your digit in Devanagari and get that digit in English </h3>
      <Canvas width={200} height={200}></Canvas>
    </div>
  );
}

export default Prediction