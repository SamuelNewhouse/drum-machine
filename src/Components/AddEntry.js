import React from 'react';
import { connect } from 'react-redux';
import EntryForm from './EntryForm';
import { setRecordingState, EDITING } from '../actions';

const AddEntry = ({ classes, name, delay, isBeingEdited, onMouseDown, startEdit }) => {
  return (
    <div className={classes} onMouseDown={onMouseDown}>
      <span className="info">{name} - {delay}</span>
      <button type="button" className="edit btn" onClick={startEdit}>Add</button>
      {isBeingEdited && <EntryForm/>}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    startEdit: () => dispatch(setRecordingState(EDITING))
  }
}

export default connect(null, mapDispatchToProps)(AddEntry);