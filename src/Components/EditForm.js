import React from 'react';
import pads from '../data/pads';

const EditForm = (position) => {
  return (
    <form className="edit-form">
      <label htmlFor="instrument">Instrument</label>
      <select className="custom-select" id="instrument">
        {Array.from(pads, ([key, value]) =>
          <option key={key} value={value.id}>{key + " - " + value.id}</option>)
        }
      </select>
      <label htmlFor="delay">Delay</label>
      <input type="number" id="delay" min="0"></input>
    </form>
  )
}

export default EditForm;