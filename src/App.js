import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrumMachine from './Components/DrumMachine';
import './index.scss'
import pads from './data/pads';
import { playPad } from './actions';

const handleKeys = (event, play) => {
  const letter = event.key.toUpperCase();

  if (pads.has(letter))
    play(letter);
}

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown',
      event => handleKeys(event, this.props.play)
    );
  }
  componentWillUnmount() {
    window.removeEventListener('keydown',
      event => handleKeys(event, this.props.play)
    );
  }

  render() {
    return <DrumMachine onKeyDown={handleKeys} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    play: letter => dispatch(playPad(letter))
  }
}

export default connect(null, mapDispatchToProps)(App);