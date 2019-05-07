import {
  START_PAD,
  END_PAD,
  RECORD_PAD,
  SET_RECORDING_STATE,
  SET_RECORDING_POSITION,
  SET_RECORDING,
  RecordingStates,
} from '../actions';

import pads from '../data/pads'

const initialState = {
  recording: [],
  recordingState: RecordingStates.PAUSED,
  position: 0,
  lastDrumPadTime: null,
  lastDrumPad: null
};
for (let key of pads.keys())
  initialState[key] = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_PAD:
      return Object.assign({}, state, {
        [action.letter]: 'pressed',
        lastDrumPad: action.letter
      })
    case END_PAD:
      return Object.assign({}, state, { [action.letter]: '' })

    default:
      return state;
  }
}

export default reducer;