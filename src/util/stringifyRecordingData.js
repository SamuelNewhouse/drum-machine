const stringifyRecordingData = data =>
  data.reduce((acum, cv) => acum + cv.name + " - " + cv.delay + "\n", "");

export default stringifyRecordingData;