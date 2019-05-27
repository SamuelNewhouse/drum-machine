import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAUSED, RECORDING, setRecordingState, beginPlayRecording, setRecordingPosition, EDITING } from '../actions';
import Button from './Button';

import first from '../svg/first.svg';
import play from '../svg/play3.svg';
import pause from '../svg/pause2.svg';
import record from '../svg/record.svg';
import last from '../svg/last.svg';
import copy from '../svg/copy.svg';
import paste from '../svg/paste.svg';
import clear from '../svg/bin.svg';
import Recording from './Recording';

class Record extends Component {
  render() {
    const {
      recordingData,
      recordingState,
      playRecording,
      pauseRecording,
      startRecording,
      setRecordingPosition } = this.props;

    return (
      <>
        <div id="recording-top-bar" className="button-bar">
          <Button
            alt="First"
            src={first}
            disabled={recordingState !== PAUSED || recordingData.length < 2}
            onMouseDown={() => setRecordingPosition(0)}
          />
          <Button
            alt="Play"
            src={play}
            disabled={recordingState !== PAUSED || recordingData.length < 2}
            onMouseDown={playRecording}
          />
          <Button
            alt="Pause"
            src={pause}
            disabled={recordingState === PAUSED || recordingState === EDITING}
            onMouseDown={pauseRecording}
          />
          <Button
            alt="Record"
            src={record}
            disabled={recordingState !== PAUSED}
            onMouseDown={startRecording}
          />
          <Button
            alt="Last"
            src={last}
            disabled={recordingState !== PAUSED || recordingData.length < 2}
            onMouseDown={() => setRecordingPosition(recordingData.length - 1)}
          />
        </div>

        <Recording />

        <div id="recording-bottom-bar" className="button-bar">
          <button type="button"><img alt="Copy" src={copy}></img></button>
          <button type="button"><img alt="Paste" src={paste}></img></button>
          <button type="button"><img alt="Clear" src={clear}></img></button>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    recordingData: state.recordingData,
    recordingState: state.recordingState,
    position: state.position
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playRecording: () => dispatch(beginPlayRecording()),
    pauseRecording: () => dispatch(setRecordingState(PAUSED)),
    startRecording: () => dispatch(setRecordingState(RECORDING)),
    setRecordingPosition: position => dispatch(setRecordingPosition(position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);