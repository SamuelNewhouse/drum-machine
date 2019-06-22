import React from 'react';
import { connect } from 'react-redux';
import EntryForm from './EntryForm';
import { setRecordingState, deleteEntry, EDITING } from '../actions';

const RecordEntry = ({ componentPosition, classes, name, delay, isBeingEdited, onMouseDown, startEdit, deleteEntry }) => {
  return (
    <div className={classes} onMouseDown={onMouseDown}>
      <span className="info">{name} - {delay}</span>
      <button type="button" className="edit btn" onClick={startEdit}>Edit</button>
      <button type="button" className="delete btn" onClick={() => deleteEntry(componentPosition)}>X</button>
      {isBeingEdited && <EntryForm/>}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    startEdit: () => dispatch(setRecordingState(EDITING)),
    deleteEntry: position => dispatch(deleteEntry(position))
  }
}

export default connect(null, mapDispatchToProps)(RecordEntry);