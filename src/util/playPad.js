const playPad = (buttonID, audioID) => {
  const button = document.getElementById(buttonID);
  const audio = document.getElementById(audioID);
  button.focus();
  button.classList.add('pressed');
  setTimeout(() => button.classList.remove('pressed'), 100);
  audio.currentTime = 0;
  audio.play();
}

export default playPad;