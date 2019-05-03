import React from 'react';
import { connect } from 'react-redux';
import pads from '../data/pads';

const Display = ({text}) => {
  return <div id="display"> {text} </div>
}

const mapStateToProps = state => {
  if (!state.lastDrumPad)
    return { text: '\u00A0' }; // &nbsp; for keeping div expanded.

  return { text: pads.get(state.lastDrumPad).id };
}
export default connect(mapStateToProps, null)(Display);