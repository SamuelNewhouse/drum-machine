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
  recordingData: [],
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
        lastDrumPad: action.letter,
      })

    case END_PAD:
      return Object.assign({}, state, { [action.letter]: '' })

    case RECORD_PAD:
      const now = Date.now();
      const lastDrumPadTime = state.lastDrumPadTime || now;
      const delay = now - lastDrumPadTime;

      const newRecord = {
        name: pads.get(action.letter).id,
        letter: action.letter,
        delay
      }
      return Object.assign({}, state, {
        recordingData: [...state.recordingData, newRecord],
        lastDrumPadTime: now
      })

    case SET_RECORDING_STATE:
      const newState = action.recordingState;
      const oldState = state.recordingState;

      // if moving into recording, set lastDrumPadTime to current time.
      if (
        newState === RecordingStates.RECORDING &&
        oldState !== RecordingStates.RECORDING
      )
        return Object.assign({}, state, { recordingState: action.recordingState, lastDrumPadTime: Date.now() })
      else
        return Object.assign({}, state, { recordingState: action.recordingState })


    default:
      return state;
  }
}

export default reducer;