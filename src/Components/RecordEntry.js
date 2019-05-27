import React from 'react';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import { setRecordingState, deleteEntry, EDITING } from '../actions';

const RecordEntry = ({ position, classes, name, delay, isBeingEdited, onMouseDown, startEdit, deleteEntry }) => {
  return (
    <div className={classes} onMouseDown={onMouseDown}>
      <span className="info">{name} - {delay}</span>
      <button type="button" className="edit" onClick={startEdit}>Edit</button>
      <button type="button" className="delete" onClick={() => deleteEntry(position)}>X</button>
      {isBeingEdited && <EditForm position={position} />}
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