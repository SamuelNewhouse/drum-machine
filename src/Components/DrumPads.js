import React from 'react';
import DrumPad from './DrumPad';
import pads from '../data/pads';

const DrumPads = () => {
  return (
    <div id="drum-pads">
      {Array.from(pads, ([key, value]) =>
        <DrumPad id={key} key={key} letter={value.letter} url={value.url} />
      )}
    </div>
    )
  }

export default DrumPads;