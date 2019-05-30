import React, { Component } from 'react';
import { connect } from 'react-redux';
import pads from '../data/pads';
import { editEntry, addEntry, playPad } from '../actions';
import { setRecordingState, setRecordingPosition, PAUSED } from '../actions';

class EntryForm extends Component {
  onSubmit = event => {
    event.preventDefault();
    const target = event.target;
    const { position, isEditMode, editEntry, addEntry, exitEditMode, setRecordingPosition } = this.props;

    if (isEditMode)
      editEntry(position, target.instrument.value, Number(target.delay.value));
    else {
      addEntry(target.instrument.value, Number(target.delay.value));
      setRecordingPosition(position + 1); // TODO: Place this in a thunk in action creators.
    }

    // TODO: Make this less confusing. There are two different meanings for "EditMode" here.
    exitEditMode();
  }

  render() {
    const { position, recordingData, isEditMode, exitEditMode, playPad } = this.props;

    let letter = "Q", delay = 0;
    if (isEditMode)
      ({ letter, delay } = recordingData[position]);

    return (
      <form className="edit-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="instrument">Instrument</label>
          <select className="custom-select" id="instrument" defaultValue={letter} onChange={event => playPad(event.target.value)}>
            {Array.from(pads, ([key, v]) =>
              <option key={key} value={key}>{key + " - " + v.id}</option>)
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="delay">Delay</label>
          <input type="number" className="form-control" id="delay" min="0" max="3600000" step="1" defaultValue={delay}></input>
        </div>
        <input type="submit" value="Save"></input>
        <button type="button" onClick={exitEditMode} >Cancel</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    recordingData: state.recordingData,
    isEditMode: Boolean(state.recordingData[state.position])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEntry: (position, letter, delay) => dispatch(editEntry(position, letter, delay)),
    addEntry: (letter, delay) => dispatch(addEntry(letter, delay)),
    exitEditMode: () => dispatch(setRecordingState(PAUSED)),
    playPad: letter => dispatch(playPad(letter)),
    setRecordingPosition: position => dispatch(setRecordingPosition(position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);