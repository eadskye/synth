
///////////////////////////////////////////
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

function Synth(audioCtx) {
  const oscNode = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  this.start = () => oscNode.start();
  this.stop = () => oscNode.stop();
  this.setFreq = (freq) => {
    oscNode.frequency.value = freq
  }
  this.setGain = (gain) => {
    gainNode.gain.value = gain;
  }

  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  // osc.connect(analyser);
}

module.exports = Synth;
