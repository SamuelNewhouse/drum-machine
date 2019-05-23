import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PAUSED, setRecordingPosition, RECORDING } from '../actions';
import RecordEntry from './RecordEntry';

class Recording extends Component {
  constructor(props) {
    super(props);
    this.recordingDivRef = React.createRef();
  }

  componentDidUpdate() {
    const recordingDiv = this.recordingDivRef.current;
    const curPosition = this.props.position;

    if (curPosition < 1) {
      recordingDiv.scrollTo(0, 0);
      return;
    }

    const minScrollPixel = recordingDiv.scrollTop;
    const maxScrollPixel = minScrollPixel + recordingDiv.clientHeight;
    const curRecordEntry = recordingDiv.querySelector(`.record-entry:nth-of-type(${curPosition})`);

    let behavior = 'smooth';
    if (curRecordEntry.offsetTop < minScrollPixel || curRecordEntry.offsetTop > maxScrollPixel)
      behavior = 'auto';

    curRecordEntry.scrollIntoView({ behavior });
  }

  getMouseDownFunction = (index) => {
    const { recordingState, setRecordingPosition } = this.props;

    // Only provide click functionality when PAUSED
    return recordingState === PAUSED ?
      () => setRecordingPosition(index) :
      () => undefined;
  }

  makeRecordEntry = (value, index) => {
    const { recordingData, position } = this.props;

    let classes = "record-entry";
    if (recordingData[index].playing)
      classes += " entry-playing";
    if (index === position)
      classes += " entry-selected";

    return <RecordEntry
      className={classes}
      name={value.name}
      delay={value.delay}
      onMouseDown={this.getMouseDownFunction(index)}
    />
  }

  render() {
    const { recordingData, recordingState } = this.props;

    return (
      <div
        id="recording"
        className={"state-" + recordingState.toLowerCase()}
        ref={this.recordingDivRef}
      >
        <div>
          {recordingData.map(this.makeRecordEntry)}
        </div>
      </div>
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
    setRecordingPosition: position => dispatch(setRecordingPosition(position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recording);