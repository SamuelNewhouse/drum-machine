import React, { Component } from 'react';
import { connect } from 'react-redux';
import pads from '../data/pads';
import { editEntry, playPad } from '../actions';
import { setRecordingState, PAUSED } from '../actions';

class EditForm extends Component {
  onSubmit = event => {
    event.preventDefault();
    const target = event.target;
    const { position, editEntry, exitEditMode } = this.props;

    editEntry(position, target.instrument.value, Number(target.delay.value));
    exitEditMode();
  }

  render() {
    const { position, recordingData, exitEditMode, playPad } = this.props;
    const { letter, delay } = recordingData[position];
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
          <input type="number" className="form-control" id="delay" min="0" max="3600000" defaultValue={delay}></input>
        </div>
        <input type="submit" value="Save"></input>
        <button type="button" onClick={exitEditMode} >Cancel</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return { recordingData: state.recordingData }
}

const mapDispatchToProps = dispatch => {
  return {
    editEntry: (position, letter, delay) => dispatch(editEntry(position, letter, delay)),
    exitEditMode: () => dispatch(setRecordingState(PAUSED)),
    playPad: letter => dispatch(playPad(letter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);