export const PLAY_PAD = 'PLAY_PAD';
export const START_PAD = 'START_PAD';
export const END_PAD = 'END_PAD';
export const RECORD_PAD = 'RECORD_PAD';
export const SET_RECORDING_STATE = 'SET_RECORDING_STATE';
export const SET_RECORDING_POSITION = 'SET_RECORDING_POSITION';
export const SET_RECORDING = 'SET_RECORDING';

export const RecordingStates = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  RECORDING: 'RECORDING'
}

export function playPad(letter) {
  return (dispatch, getState) => {
    dispatch(startPad(letter));
    setTimeout(() => dispatch(endPad(letter)), 100);

    const { recordingState } = getState();
    if (recordingState === RecordingStates.RECORDING)
      dispatch(recordPad(letter));
  }
}
export function startPad(letter) {
  return { type: START_PAD, letter }
}
export function endPad(letter) {
  return { type: END_PAD, letter }
}
export function recordPad(letter) {
  return { type: RECORD_PAD, letter }
}
export function setRecordingState(state) {
  return { type: SET_RECORDING_STATE, state }
}
export function setRecordingPosition(position) {
  return { type: SET_RECORDING_POSITION, position }
}
export function setRecording(recording) {
  return { type: SET_RECORDING, recording }
}