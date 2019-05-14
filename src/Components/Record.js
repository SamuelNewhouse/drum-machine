import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAUSED, RECORDING, setRecordingState, beginPlayRecording, setRecordingPosition } from '../actions';
import Button from './Button';

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

  componentDidUpdate({position}) {
    let curPosition = this.props.position - 1;
    const lastPosition = position - 1;

    if (curPosition < 0) {
      this.recordingDivRef.current.scrollTo(0,0);
      return;
    }

    const positionDifference = Math.abs(curPosition - lastPosition);
    const delay = this.props.recordingData[curPosition].delay;

    let behavior = 'smooth';
    if (delay < 100 || positionDifference > 1 )
      behavior = 'auto';

    const recordingDiv = this.recordingDivRef.current;
    const s = recordingDiv.querySelectorAll('.record-entry')[curPosition];

    s.scrollIntoView({ behavior });
  }

  render() {
    const {
      recordingData,
      recordingState,
      position,
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
            disabled={recordingState !== PAUSED}
            onMouseDown={playRecording}
          />
          <Button
            alt="Pause"
            src={pause}
            disabled={recordingState === PAUSED}
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
            disabled={recordingState !== PAUSED}
            onMouseDown={() => setRecordingPosition(recordingData.length - 1)}
          />
        </div>
        <div id="recording" ref={this.recordingDivRef}>
          <div>
            {recordingData.map((value, index) => {
              let classes = "record-entry";
              if (recordingData[index].playing)
                classes += " playing";
              if (index === position)
                classes += " selected";

              return <div key={index} className={classes}> {value.name} - {value.delay} </div>
            }
            )}
          </div>
        </div>
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