const React = require('react');
const ReactDOM = require('react-dom');

var GainButton = (props) => {
  var text = `Gain is ${props.on ? "ON" : "OFF"}`;
  return(
    <div>
      <p>{text}</p>
      <button onClick={props.handleClick}>GAIN</button>
    </div>
  )
}

var FreqSlider = (props) => {
  return (
    <div>
      <p>freq: {props.frequency}</p>
      <input type="range" onChange={props.handleSlide}/>
    </div>
  )
}

var Oscillator = React.createClass({
  getInitialState: function() {
    return {
      frequency: 1000,
      gain: false
    }
  },

  handleSlide: function(e) {
    this.setState({
      frequency: e.target.value
    })
    Osc.frequency.value = this.state.frequency;
  },

  handleGainClick: function(e) {
    e.preventDefault();
    this.setState({
      gain: !this.state.gain
    });
    this.state.gain ? gain.gain.value = 0 : gain.gain.value = 1;
  },

  render: function() {
    return (
      <div>
        <GainButton on={this.state.gain} handleClick={this.handleGainClick}/>
        <FreqSlider frequency={this.state.frequency} handleSlide={this.handleSlide} />
      </div>
    )
  }
});

ReactDOM.render(
  <Oscillator />,
  document.getElementById('main')
);

///////////////////////////////////////////

var canvas = document.querySelector('.visualiser');
var canvasCtx = canvas.getContext("2d");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

var Osc = audioCtx.createOscillator();
Osc.frequency.value = 3000;
var gain = audioCtx.createGain();

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

Osc.connect(gain);
Osc.connect(analyser);
gain.connect(audioCtx.destination);
gain.gain.value = 0;
Osc.start();


// analyser
//

analyser.fftSize = 2048;

function visualise() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = `rgb(0,0,0)`;
    canvasCtx.beginPath();

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();

  }
  draw();
}

visualise();
