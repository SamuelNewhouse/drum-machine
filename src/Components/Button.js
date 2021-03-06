import React from 'react';

const Button = ({ onMouseDown, alt, src, disabled }) => {
  return (
    <button type="button" className="record-button btn" onMouseDown={onMouseDown} disabled={disabled}>
      <img alt={alt} src={src}></img>
    </button>
  )
}

export default Button;