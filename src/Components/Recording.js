import React from 'react'
import { connect } from 'react-redux';
import { PAUSED, setRecordingPosition } from '../actions';
import RecordEntry from './RecordEntry';

const Recording = ({ recordingData, recordingState, position, setRecordingPosition }) => {

  const getMouseDownFunction = (index) => {
    return recordingState === PAUSED ?
      () => setRecordingPosition(index) :
      () => undefined;
  }


  const makeRecordEntry = (value, index) => {
    let classes = "record-entry";
    if (recordingData[index].playing)
      classes += " playing";
    if (index === position)
      classes += " selected";

    return <RecordEntry
      className={classes}
      name={value.name}
      delay={value.delay}
      onMouseDown={getMouseDownFunction(index)}
    />
  }

  return <div> {recordingData.map(makeRecordEntry)} </div>
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
    setRecordingPosition: position => dispatch(setRecordingPosition(position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recording);