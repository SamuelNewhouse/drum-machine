const baseURL = "https://s3.amazonaws.com/freecodecamp/drums/";

const pads = new Map([
  ["closed-hh", { letter: "Q", keyCode: 81, url: baseURL + "Cev_H2.mp3" }],
  ["open-hh", { letter: "W", keyCode: 87, url: baseURL + "Dsc_Oh.mp3" }],
  ["shaker", { letter: "E", keyCode: 69, url: baseURL + "Give_us_a_light.mp3" }],
  ["clap", { letter: "A", keyCode: 65, url: baseURL + "Heater-6.mp3" }],
  ["side-stick", { letter: "S", keyCode: 83, url: baseURL + "side_stick_1.mp3" }],
  ["snare", { letter: "D", keyCode: 68, url: baseURL + "Brk_Snr.mp3" }],
  ["punchy-kick", { letter: "Z", keyCode: 90, url: baseURL + "punchy_kick_1.mp3" }],
  ["kick", { letter: "X", keyCode: 88, url: baseURL + "RP4_KICK_1.mp3" }],
  ["kick-n-hat", { letter: "C", keyCode: 67, url: baseURL + "Kick_n_Hat.mp3" }],
]);

export default pads;