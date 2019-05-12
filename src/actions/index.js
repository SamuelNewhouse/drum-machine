export const START_PAD = 'START_PAD';
export const END_PAD = 'END_PAD';
export const RECORD_PAD = 'RECORD_PAD';

export const START_LINE = 'START_LINE';
export const END_LINE = 'END_LINE';

export const ADD_TIMEOUT = 'ADD_TIMEOUT';
export const CLEAR_ALL_TIMEOUTS = 'CLEAR_ALL_TIMEOUTS';

export const SET_RECORDING_STATE = 'SET_RECORDING_STATE';
export const SET_RECORDING_POSITION = 'SET_RECORDING_POSITION';
export const SET_RECORDING = 'SET_RECORDING';

export const PLAYING = 'PLAYING';
export const PAUSED = 'PAUSED';
export const RECORDING = 'RECORDING';

export function startPad(letter) {
  return { type: START_PAD, letter }
}
export function endPad(letter) {
  return { type: END_PAD, letter }
}
export function recordPad(letter) {
  return { type: RECORD_PAD, letter }
}
export function startLine(position) {
  return { type: START_LINE, position }
}
export function endLine(position) {
  return { type: END_LINE, position }
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

export function playLine(position) {
  return dispatch => {
    dispatch(startLine(position));
    setTimeout(() => dispatch(endLine(position)), 200);
  }
}

export function beginPlayRecording() {
  return (dispatch, getState) => {
    const { position, recordingData } = getState();
    if (position >= recordingData.length - 1)
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

    if (position >= recordingData.length - 1) {
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