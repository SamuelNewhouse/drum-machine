import React, { Component } from 'react';
import DrumPad from './DrumPad';
import pads from '../data/pads';

class DrumPads extends Component {
  render() {
    return (
      <div id="drum-pads">
        {Array.from(pads, ([key, value]) =>
          <DrumPad key={key} letter={key} id={value.id} url={value.url} />
        )}
      </div>
    )
  }
}

export default DrumPads;