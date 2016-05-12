const audioCtx = require('./helpers/audioctx');
const connectSignal = require('./helpers/connectSignal');

let scope = function(canvas, signal) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
  let frame;
  let analyser = audioCtx.createAnalyser();
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  analyser.fftSize = 2048;

  connectSignal(signal, analyser);

  let ctx = canvas.getContext('2d');
  let width = canvas.width;
  let height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  function drawSteps() {
    let sliceWidth = width * 1.0 / bufferLength;
    let x = 0;

    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = 'rgb(58, 64, 52)';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(206,255,26)';
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

    frame = requestAnimationFrame(drawSteps);
  }

  return {
    start: () => {
      drawSteps();
    },
    stop: () => {
      window.cancelAnimationFrame(frame);
    }
  }
}

module.exports = scope;
