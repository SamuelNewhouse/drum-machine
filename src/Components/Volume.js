import React from 'react';

import volumeIncrease from '../svg/volume-increase.svg';
import volumeDecrease from '../svg/volume-decrease.svg';

const Volume = () => {
  return (
  <div id="volume">
    <img src={volumeIncrease} alt="Increase Volume"></img>
    <input type="range" orient="vertical" min="0" max="100"></input>
    <img src={volumeDecrease} alt="Decrease Volume"></img>
  </div>
  )
}

export default Volume;