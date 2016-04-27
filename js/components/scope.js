const React = require('react');
const audioCtx = require('../helpers/audioctx');

var Scope = React.createClass({
  componentDidMount: function() {
    this.buildScope()
  },
  buildScope: function() {
    // memo me plz
    var canvas = this.refs.canvas;
    var ctx = canvas.getContext('2d');
    var analyser = audioCtx.createAnalyser();
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var width = canvas.width;
    var height = canvas.height;
    analyser.fftSize = 2048;

    this.props.osc.connect(analyser);

    ctx.clearRect(0, 0, width, height);

    (function draw() {
      var sliceWidth = width * 1.0 / bufferLength;
      var x = 0;

      drawVisual = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "rgb(200, 200, 200)";
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgb(0,0,0)`;
      ctx.beginPath();

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * height / 2;

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
  },
  render: function() {
    return(
      <canvas ref="canvas"></canvas>
    )
  }
});

module.exports = Scope;
