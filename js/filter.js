const audioCtx = require('./helpers/audioctx');

function Filter(input) {
  let filterNode = audioCtx.createBiquadFilter();

  // TODO: factor out this individual / array signal logic
  let connectSignal = (input) => {
    input.connect(filterNode);
  }

  Array.isArray(input) ? input.forEach(connectSignal) : connectSignal(input);

  filterNode.connect(audioCtx.destination);

  this.setCutoff = (cutoff) => {
    filterNode.frequency.value = cutoff;
  }
}

module.exports = Filter;
