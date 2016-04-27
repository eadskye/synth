
///////////////////////////////////////////
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

function Oscillator(audioCtx) {
  const oscNode = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

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
    return oscNode;
  }

  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  // osc.connect(analyser);
  //
}

module.exports = Oscillator;
