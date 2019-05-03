import React from 'react';
import DrumPads from './DrumPads';
import Display from './Display';
import Record from './Record';
import Volume from './Volume';

const DrumMachine = () => {
  return (
  <div id="drum-machine">
    <DrumPads />
    <Display />
    <Record />
    <Volume />
  </div>
  )
}

export default DrumMachine