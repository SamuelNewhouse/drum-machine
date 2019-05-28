import React from 'react';

const Volume = () => {
  return (
  <div id="volume">
    <label htmlFor="volumeSlider">Volume</label>
    <input id="volumeSlider" type="range" orient="vertical" min="0" max="100"></input>
  </div>
  )
}

export default Volume;