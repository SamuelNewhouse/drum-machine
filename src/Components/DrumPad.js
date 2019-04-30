import React from 'react';

const DrumPad = ({id, letter, url, onClick}) => {
  return (
  <button type="button" id={id} className="btn btn-outline-dark drum-pad">
    {letter}
    <audio id={letter} src={url} ></audio>
  </button>
  )
}

export default DrumPad;