import { PAUSED, RECORDING } from '../actions';
import pads from '../data/pads';

const initialState = {
  recordingData: [{ // Used for blank recording and entry cell
    isEmpty: true,
    name: '\u00A0 - \u00A0',
    delay: '\u00A0 - \u00A0'
  }],
  recordingState: PAUSED,
  position: 0,
  lastDrumPadTime: null,
  lastDrumPad: null,
  timeouts: []
}; for (let key of pads.keys())
  initialState[key] = "";

const actionTypeHandlers = {
  START_PAD: function (state, action) {
    const updates = {
      [action.letter]: 'pressed',
      lastDrumPad: action.letter,
    };

    return Object.assign({}, state, updates);
  },

  END_PAD: function (state, action) {
    const updates = {
      [action.letter]: ''
    }

    return Object.assign({}, state, updates);
  },

  RECORD_PAD: function (state, action) {
    const now = Date.now();
    const lastDrumPadTime = state.lastDrumPadTime || now;
    const delay = now - lastDrumPadTime;

    const newRecord = {
      name: pads.get(action.letter).id,
      letter: action.letter,
      playing: false,
      delay
    }

    const recordingData = [...state.recordingData];
    recordingData.splice(state.position, 0, newRecord);

    const updates = {
      recordingData,
      lastDrumPadTime: now,
      position: state.position + 1
    }

    return Object.assign({}, state, updates);
  },

  START_LINE: function (state, action) {
    const recordingData = [...state.recordingData];
    recordingData[action.position].playing = true;

    const updates = { recordingData }
    return Object.assign({}, state, updates);
  },

  END_LINE: function (state, action) {
    const recordingData = [...state.recordingData];
    recordingData[action.position].playing = false;

    const updates = { recordingData }
    return Object.assign({}, state, updates);
  },

  ADD_TIMEOUT: function(state, action) {
    const timeouts = [...state.timeouts, action.timeout];

    const updates = { timeouts };
    return Object.assign({}, state, updates);
  },

  CLEAR_ALL_TIMEOUTS: function(state) {
    for(let t of state.timeouts)
      clearTimeout(t);

    const updates = [];
    return Object.assign({}, state, updates);
  },

  SET_RECORDING_STATE: function (state, action) {
    const newState = action.recordingState;
    const oldState = state.recordingState;

    const updates = { recordingState: action.recordingState }

    if (newState === RECORDING && oldState !== RECORDING)
      updates.lastDrumPadTime = Date.now();

    return Object.assign({}, state, updates);
  },

  SET_RECORDING_POSITION: function (state, action) {
    const updates = { position: action.position }
    return Object.assign({}, state, updates);
  },
}

const reducer = (state = initialState, action) => {
  const actionHandler = actionTypeHandlers[action.type];

  if (!actionHandler)
    return state;

  return actionHandler(state, action);
}

export default reducer;