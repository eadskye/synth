const audioCtx = require('./helpers/audioctx');
const connectSignal = require('./helpers/connectSignal');

function Filter() {
  let filterNode = audioCtx.createBiquadFilter();
  filterNode.connect(audioCtx.destination);

  this.setCutoff = (cutoff) => {
    filterNode.frequency.value = cutoff;
  }

  this.connect = (signal) => { connectSignal(signal, filterNode) };
}

module.exports = Filter;
