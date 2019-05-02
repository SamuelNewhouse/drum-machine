import React from 'react';
import playPad from '../util/playPad';

const DrumPad = ({ letter, id, url }) => {
  return (
    <button type="button" id={id} className="drum-pad" onMouseDown={() => { playPad(id, letter) }}>
      {letter}
      <audio id={letter} src={url} ></audio>
    </button>
  )
}

export default DrumPad;