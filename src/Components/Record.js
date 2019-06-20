import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAUSED, RECORDING, setRecordingState, beginPlayRecording, deleteAllEntries, setRecordingPosition, EDITING } from '../actions';
import Button from './Button';
import stringifyRecordingData from '../util/stringifyRecordingData';
import copyToClipboard from '../util/copyToClipboard';

import first from '../svg/first.svg';
import play from '../svg/play3.svg';
import pause from '../svg/pause2.svg';
import record from '../svg/record.svg';
import last from '../svg/last.svg';
import copy from '../svg/copy.svg';
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
      deleteAllEntries,
      setRecordingPosition } = this.props;

    return (
      <>
        <div id="recording-top-bar" className="button-bar">
          <Button
            alt="First"
            src={first}
            disabled={recordingState !== PAUSED || recordingData.length < 1}
            onMouseDown={() => setRecordingPosition(0)}
          />
          <Button
            alt="Play"
            src={play}
            disabled={recordingState !== PAUSED || recordingData.length < 1}
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
            disabled={recordingState !== PAUSED || recordingData.length < 1}
            onMouseDown={() => setRecordingPosition(recordingData.length)}
          />
        </div>
        <Recording />

        <div id="recording-bottom-bar" className="button-bar">
          <Button
            alt="Copy"
            src={copy}
            disabled={recordingState !== PAUSED || recordingData.length < 1}
            onMouseDown={() => copyToClipboard(stringifyRecordingData(recordingData))}
          />
          <Button
            alt="Clear"
            src={clear}
            disabled={recordingState !== PAUSED}
            onMouseDown={deleteAllEntries}
          />
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
    deleteAllEntries: () => dispatch(deleteAllEntries()),
    setRecordingPosition: position => dispatch(setRecordingPosition(position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);