const baseURL = "https://s3.amazonaws.com/freecodecamp/drums/";

const pads = new Map([
  ["Q", { id: "closed-hh", url: baseURL + "Cev_H2.mp3" }],
  ["W", { id: "open-hh", url: baseURL + "Dsc_Oh.mp3" }],
  ["E", { id: "shaker", url: baseURL + "Give_us_a_light.mp3" }],
  ["A", { id: "clap", url: baseURL + "Heater-6.mp3" }],
  ["S", { id: "side-stick", url: baseURL + "side_stick_1.mp3" }],
  ["D", { id: "snare", url: baseURL + "Brk_Snr.mp3" }],
  ["Z", { id: "punchy-kick", url: baseURL + "punchy_kick_1.mp3" }],
  ["X", { id: "kick", url: baseURL + "RP4_KICK_1.mp3" }],
  ["C", { id: "kick-n-hat", url: baseURL + "Kick_n_Hat.mp3" }],
]);

export const nameToLetter = {
  "closed-hh": "Q",
  "open-hh": "W",
  "shaker": "E",
  "clap": "A",
  "side-stick": "S",
  "snare": "D",
  "punchy-kick": "Z",
  "kick": "X",
  "kick-n-hat": "C",
}

export default pads;