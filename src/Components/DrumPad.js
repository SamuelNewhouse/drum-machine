import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playPad } from '../actions'

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.audioRef = React.createRef();
  }

  componentDidUpdate({ pressed, volume }) {
    if (pressed) {
      this.buttonRef.current.focus();
      this.audioRef.current.currentTime = 0;
      this.audioRef.current.play();
    }

    this.audioRef.current.volume = volume;
  }

  render() {
    const { letter, id, url, pressed, playPad } = this.props;

    return (
      <button
        type="button"
        id={id}
        className={"drum-pad " + pressed}
        onMouseDown={() => { playPad(letter) }}
        ref={this.buttonRef}
      >
        {letter}
        <audio id={letter} className="clip" src={url} ref={this.audioRef} />
      </button>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pressed: state[ownProps.letter],
    volume: state.volume / 100
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playPad: letter => dispatch(playPad(letter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrumPad);