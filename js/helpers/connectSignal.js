/* 
 * A helper that connects either an array of AudioNodes or a single AudioNode to
 * an output AudioNode
 *
 * param {AudioNode, [AudioNode]} signal
 * param {AudioNode} output
 */
let connectSignal = (signal, output) => {
  // webaudio API is "fire and forget", no introspection
  // so just keep spamming connections
  let connect = (node) => {
    node.connect(output);
  }
  Array.isArray(signal) ? signal.forEach(connect) : connect(signal);

}


module.exports = connectSignal
