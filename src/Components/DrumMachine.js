import React from 'react';
import DrumPads from './DrumPads';
import Display from './Display';
import Volume from './Volume';

const DrumMachine = () => {
  return (
  <div id="drum-machine">
    <DrumPads />
    <Display />
    <Volume />
  </div>
  )
}

export default DrumMachine