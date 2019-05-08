import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRecordingState, RecordingStates, beginPlayRecording } from '../actions';

import first from '../svg/first.svg';
import play from '../svg/play3.svg';
import pause from '../svg/pause2.svg';
import record from '../svg/record.svg';
import last from '../svg/last.svg';
import copy from '../svg/copy.svg';
import paste from '../svg/paste.svg';
import clear from '../svg/bin.svg';

class Record extends Component {
  constructor(props) {
    super(props);
    this.recordingDivRef = React.createRef();
  }

  componentDidUpdate() {
    const recordingDiv = this.recordingDivRef.current;
    recordingDiv.scrollTop = recordingDiv.scrollHeight;
  }

  render() {
    const {
      recordingData,
      playRecording,
      pauseRecording,
      startRecording } = this.props;

    return (
      <>
        <div id="recording-top-bar">
          <button type="button"><img alt="First" src={first}></img></button>
          <button type="button" onMouseDown={playRecording}><img alt="Play" src={play}></img></button>
          <button type="button" onMouseDown={pauseRecording}><img alt="Pause" src={pause}></img></button>
          <button type="button" onMouseDown={startRecording}><img alt="Record" src={record}></img></button>
          <button type="button"><img alt="Last" src={last}></img></button>
        </div>
        <div id="recording" ref={this.recordingDivRef}>
          <div>
            {recordingData.map(value => <>{value.name} - {value.delay} <br /></>)}
          </div>
        </div>
        <div id="recording-bottom-bar">
          <button type="button"><img alt="Copy" src={copy}></img></button>
          <button type="button"><img alt="Paste" src={paste}></img></button>
          <button type="button"><img alt="Clear" src={clear}></img></button>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return { recordingData: state.recordingData }
}

const mapDispatchToProps = dispatch => {
  return {
    playRecording: () => dispatch(beginPlayRecording(0)),
    pauseRecording: () => dispatch(setRecordingState(RecordingStates.PAUSE)),
    startRecording: () => dispatch(setRecordingState(RecordingStates.RECORDING)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);