export const PLAY_PAD = 'PLAY_PAD';
export const END_PAD = 'END_PAD';
export const RECORD_PAD = 'RECORD_PAD';

export const PLAY_ENTRY = 'PLAY_ENTRY';
export const END_ENTRY = 'END_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const ADD_ENTRY = 'ADD_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';

export const ADD_TIMEOUT = 'ADD_TIMEOUT';
export const CLEAR_ALL_TIMEOUTS = 'CLEAR_ALL_TIMEOUTS';

export const SET_RECORDING_STATE = 'SET_RECORDING_STATE';
export const SET_RECORDING_POSITION = 'SET_RECORDING_POSITION';
export const SET_RECORDING = 'SET_RECORDING';
export const SET_VOLUME = 'SET_VOLUME';

export const PLAYING = 'PLAYING';
export const PAUSED = 'PAUSED';
export const RECORDING = 'RECORDING';
export const EDITING = 'EDITING';

export function startPad(letter) {
  return { type: PLAY_PAD, letter }
}
export function endPad(letter) {
  return { type: END_PAD, letter }
}
export function recordPad(letter) {
  return { type: RECORD_PAD, letter }
}
export function playEntry(position) {
  return { type: PLAY_ENTRY, position }
}
export function endEntry(position) {
  return { type: END_ENTRY, position }
}
export function editEntry(position, letter, delay) {
  return { type: EDIT_ENTRY, data: { position, letter, delay } }
}
export function deleteEntry(position) {
  return { type: DELETE_ENTRY, position }
}
export function addTimeout(timeout) {
  return { type: ADD_TIMEOUT, timeout }
}
export function clearAllTimeouts() {
  return { type: CLEAR_ALL_TIMEOUTS }
}
export function setRecordingPosition(position) {
  return { type: SET_RECORDING_POSITION, position }
}
export function setRecording(recording) {
  return { type: SET_RECORDING, recording }
}
export function setVolume(volume) {
  return { type: SET_VOLUME, volume }
}

//=============================================================================
// Thunks
export function setRecordingState(recordingState) {
  return (dispatch, getState) => {
    const newState = recordingState;
    const oldState = getState().recordingState;

    if (newState !== oldState)
      dispatch(clearAllTimeouts())

    dispatch({ type: SET_RECORDING_STATE, recordingState });
  }
}

export function playPad(letter) {
  return (dispatch, getState) => {
    dispatch(startPad(letter));
    setTimeout(() => dispatch(endPad(letter)), 100);

    const { recordingState, position } = getState();

    if (recordingState === RECORDING)
      dispatch(recordPad(letter));

    if (recordingState === PLAYING || recordingState === RECORDING)
      dispatch(playLine(position));
  }
}

export function addEntry(letter, delay) {
  return (dispatch, getState) => {
    const { position } = getState();
    dispatch({ type: ADD_ENTRY, data: { letter, delay } });
    dispatch(setRecordingPosition(position + 1));
  }
}

export function playLine(position) {
  return dispatch => {
    dispatch(playEntry(position));
    setTimeout(() => dispatch(endEntry(position)), 200);
  }
}

export function beginPlayRecording() {
  return (dispatch, getState) => {
    const { position, recordingData } = getState();
    if (position >= recordingData.length)
      dispatch(setRecordingPosition(0));

    dispatch(setRecordingState(PLAYING));
    dispatch(continuePlayRecording());
  }
}

export function continuePlayRecording() {
  return (dispatch, getState) => {
    const { recordingData, recordingState, position } = getState();

    if (recordingState !== PLAYING) {
      console.log('TEST: continuePlayRecording called while not playing');
      return;
    }

    if (position >= recordingData.length) {
      dispatch(setRecordingState(PAUSED));
      dispatch(setRecordingPosition(0));
    }
    else {
      const { letter, delay } = recordingData[position];
      dispatch(playPad(letter));

      const trackedTimeout = setTimeout(() => {
        dispatch(setRecordingPosition(position + 1));
        dispatch(continuePlayRecording())
      }, delay);

      dispatch(addTimeout(trackedTimeout));
    }
  }
}