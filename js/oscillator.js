const audioCtx = require('./helpers/audioctx');

function Oscillator() {
  const oscNode = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  this.stop = () => oscNode.stop();
  this.start = () => {
    oscNode.start();
    return this;
  }
  this.setFreq = (freq) => {
    oscNode.frequency.value = freq
    return this;
  }
  this.setGain = (gain) => {
    gainNode.gain.value = gain;
    return this;
  }
  this.setType = (type) => {
    oscNode.type = type;
  }
  this.getOscNode = () => {
    return gainNode;
  }
}

module.exports = Oscillator;
