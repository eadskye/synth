const audioCtx = require('./helpers/audioctx');

function Filter() {
  let filterNode = audioCtx.createBiquadFilter();
  filterNode.connect(audioCtx.destination);

  this.setCutoff = (cutoff) => {
    filterNode.frequency.value = cutoff;
  }

  this.connect = (signal) => {
    // TODO: factor out this individual / array signal logic, shared w/ scope
    let connectSignal = (signal) => {
      signal.connect(filterNode);
    }

    Array.isArray(signal) ? signal.forEach(connectSignal) : connectSignal(signal);
  }
}

module.exports = Filter;
