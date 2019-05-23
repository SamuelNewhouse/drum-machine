import React from 'react';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import { setRecordingState, EDITING } from '../actions';

const RecordEntry = ({ position, classes, name, delay, isBeingEdited, onMouseDown, startEdit }) => {
  return (
    <div className={classes} onMouseDown={onMouseDown}>
      <span className="info">{name} - {delay}</span>
      <button type="button" className="edit" onMouseDown={startEdit}>Edit</button>
      {isBeingEdited && <EditForm position={position}/> /* Only have a single edit form in the DOM at a time. */}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    startEdit: () => dispatch(setRecordingState(EDITING))
  }
}

export default connect(null, mapDispatchToProps)(RecordEntry);