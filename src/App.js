import React, {Component} from 'react';
import DrumMachine from './Components/DrumMachine';
import './index.scss'
import pads from './data/pads';
import playPad from './util/playPad';

const handleKeys = event => {
  const audioID = event.key.toUpperCase();

  if (pads.has(audioID)) {
    const buttonID = pads.get(audioID).id;
    playPad(buttonID, audioID);
  }
}

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown', handleKeys)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', handleKeys)
  }

  render() {
    return <DrumMachine onKeyDown={handleKeys}/>
  }
}

export default App;
