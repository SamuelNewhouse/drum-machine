import React from 'react';

const RecordEntry = ({ className, name, delay, onMouseDown }) => {
  return (
    <div className={className} onMouseDown={onMouseDown}>
      <span className="info">{name} - {delay}</span>
      <button type="button" className="edit">Edit</button>
    </div>
  )
}

export default RecordEntry;