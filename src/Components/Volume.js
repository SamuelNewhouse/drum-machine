import React from 'react';
import { connect } from 'react-redux';
import { setVolume } from '../actions';

import volumeIncrease from '../svg/volume-increase.svg';
import volumeDecrease from '../svg/volume-decrease.svg';

const Volume = ({ volume, setVolume }) => {
  return (
    <div id="volume">
      <img src={volumeIncrease} alt="Increase Volume" />
      <input type="range" orient="vertical" min="0" max="100"
        value={volume}
        onChange={event => setVolume(event.target.value)}
      />
      <img src={volumeDecrease} alt="Decrease Volume" />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    volume: state.volume
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setVolume: volume => dispatch(setVolume(volume))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Volume);