import {nameToLetter} from '../data/pads';

const parseRecordingData = string => {
  const lines = string.trim().split('\n')
  const recordingData = [];

  for(let line of lines) {
    let parts = line.split('-');
    if(parts.length < 2)
      continue;

    recordingData.name = parts[0].trim();
    recordingData.delay = parts[1].trim();
    recordingData.letter = nameToLetter(recordingData.name);
    recordingData.playing = false;

  }
}

export default parseRecordingData;