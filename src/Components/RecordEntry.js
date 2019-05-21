import React from 'react';

const RecordEntry = ({ className, name, delay, onMouseDown }) => {
  return <div className={className} onMouseDown={onMouseDown}>{name} - {delay}</div>
}

export default RecordEntry;