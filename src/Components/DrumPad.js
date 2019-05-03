import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playPad } from '../actions'

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.audioRef = React.createRef();
  }

  componentDidUpdate({pressed}) {
    if(pressed) {
      this.buttonRef.current.focus();
      this.audioRef.current.currentTime = 0;
      this.audioRef.current.play();
    }
  }

  render() {
    const { letter, id, url, pressed, play } = this.props;

    return (
      <button
        type="button"
        id={id}
        className={"drum-pad " + pressed}
        onMouseDown={() => { play(letter) }}
        ref={this.buttonRef}
      >
        {letter}
        <audio id={letter} src={url} ref={this.audioRef} ></audio>
      </button>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pressed: state[ownProps.letter]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    play: letter => dispatch(playPad(letter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrumPad);