import React from 'react';

const Button = ({ onMouseDown, alt, src, disabled }) => {
  return (
    <button type="button" class="record-button" onMouseDown={onMouseDown} disabled={disabled}>
      <img alt={alt} src={src}></img>
    </button>
  )
}

export default Button;