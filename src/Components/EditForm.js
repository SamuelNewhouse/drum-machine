import React, {Component} from 'react';
import { connect } from 'react-redux';
import pads from '../data/pads';
import { editEntry } from '../actions';
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
    const { position, recordingData, exitEditMode } = this.props;
    const { letter, delay } = recordingData[position];
    return (
      <form className="edit-form" onSubmit={this.onSubmit}>
        <label htmlFor="instrument">Instrument</label>
        <select className="custom-select" id="instrument" defaultValue={letter}>
          {Array.from(pads, ([key, v]) =>
            <option key={key} value={key}>{key + " - " + v.id}</option>)
          }
        </select>
        <label htmlFor="delay">Delay</label>
        <input type="number" id="delay" min="0" defaultValue={delay}></input>
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
    exitEditMode: () => dispatch(setRecordingState(PAUSED))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);