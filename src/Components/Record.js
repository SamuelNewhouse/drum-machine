import React from 'react';
import { connect } from 'react-redux';
import { setRecordingState, RecordingStates } from '../actions';

import first from '../svg/first.svg';
import play from '../svg/play3.svg';
import pause from '../svg/pause2.svg';
import record from '../svg/record.svg';
import last from '../svg/last.svg';
import copy from '../svg/copy.svg';
import paste from '../svg/paste.svg';
import clear from '../svg/bin.svg';

const Record = () => {
  return (
    <div id="record">
      <div id="record-top-bar">
        <button type="button"><img alt="First" src={first}></img></button>
        <button type="button"><img alt="Play" src={play}></img></button>
        <button type="button"><img alt="Pause" src={pause}></img></button>
        <button type="button"><img alt="Record" src={record}></img></button>
        <button type="button"><img alt="Last" src={last}></img></button>
      </div>
      <div id="record-bottom-bar">
        <button type="button"><img alt="Copy" src={copy}></img></button>
        <button type="button"><img alt="Paste" src={paste}></img></button>
        <button type="button"><img alt="Clear" src={clear}></img></button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { recording: state.recording }
}

const mapDispatchToProps = dispatch => {
  return {
    playRecording: () => dispatch(setRecordingState(RecordingStates.PLAYING)),
    pauseRecording: () => dispatch(setRecordingState(RecordingStates.PAUSE)),
    startRecording: () => dispatch(setRecordingState(RecordingStates.RECORDING)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);