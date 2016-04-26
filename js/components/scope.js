var canvas = document.querySelector('.visualiser');
var canvasCtx = canvas.getContext("2d");
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
// analyser
//
const analyser = audioCtx.createAnalyser();

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
