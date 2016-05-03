const React = require('react');
const audioCtx = require('./../helpers/audioctx');

let buildScope = function(audioEnv, canvas, signal) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
  let analyser = audioEnv.createAnalyser();
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  analyser.fftSize = 2048;

  let connectSignal = (signal) => {
    signal.connect(analyser);
  }

  Array.isArray(signal) ? signal.forEach(connectSignal) : connectSignal(signal);

  let ctx = canvas.getContext('2d');
  let width = canvas.width;
  let height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  (function draw() {
    let sliceWidth = width * 1.0 / bufferLength;
    let x = 0;

    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgb(0,0,0)`;
    ctx.beginPath();

    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = v * height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  })()
}
/*
 * @props {AudioNode} signal
*/
let Scope = React.createClass({
  componentDidMount: function() {
    buildScope(audioCtx, this.refs.canvas, this.props.signal)
  },
  componentWillReceiveProps: function(nextProps) {
    // only redraw scope if we are summing the signal
    if (!Array.isArray(nextProps.signal)) return;
    buildScope(audioCtx, this.refs.canvas, nextProps.signal);
  },
  render: function() {
    return(
      <canvas ref="canvas"></canvas>
    )
  }
});

module.exports = Scope;
