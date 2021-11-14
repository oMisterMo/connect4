"use strict";
/*=========================================================
  Variables
===========================================================*/
var audioContext;
var analyser;
var bufferLength; //Size of buffer
var dataArray; //The sound buffer analysis
var track; //The Audio element
var source;
var canvas;
var canvasContex;
var WIDTH = 300;
var HEIGHT = 300;
var playing = false;
var raf;
var elapsed = 0;
var start, end;
/*=========================================================
  Functions
===========================================================*/
function init() {
    //STEP 1: Create audio context
    playing = false;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 32; //range 32 to 32768 (2048 default)
    // analyser.fftSize = 64; //range 32 to 32768 (2048 default)
    // analyser.fftSize = 128; //range 32 to 32768 (2048 default)
    // analyser.fftSize = 256; //range 32 to 32768 (2048 default)
    bufferLength = analyser.frequencyBinCount; //8 bit or 0 - 255 or 1 byte
    dataArray = new Uint8Array(bufferLength); //creates an array[fftSize / 2]
    console.log(dataArray);
    //STEP 2: Inside the context, create sources — such as <audio>, oscillator, stream
    track = document.querySelector("audio"); // get the audio element
    addListeners(track);
    source = audioContext.createMediaElementSource(track);
    //STEP 3: Create effects nodes, such as reverb, biquad filter, panner, compressor
    //STEP 4 (Choose final destination of audio, for example your system speakers)
    //STEP 5 (Connect the sources up to the effects, and the effects to the destination.)
    source.connect(analyser);
    source.connect(audioContext.destination);
}
function setup() {
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvasContex = canvas.getContext("2d");
    if (canvasContex) {
        canvasContex.fillStyle = "#000";
        // canvasContex.clearRect(0, 0, WIDTH, HEIGHT);
        canvasContex.fillRect(0, 0, WIDTH, HEIGHT);
    }
    var canvasCon = document.querySelector(".canvas-container");
    if (canvasCon) {
        canvasCon.append(canvas);
    }
    // window.onresize = resetCanvas;
}
function draw() {
    if (canvasContex) {
        // console.log("get freq");
        analyser.getByteFrequencyData(dataArray);
        canvasContex.fillStyle = "rgb(0, 0, 0)";
        canvasContex.fillRect(0, 0, WIDTH, HEIGHT);
        var barWidth = WIDTH / bufferLength;
        var barHeight;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            canvasContex.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
            canvasContex.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            x += barWidth + 5;
        }
        raf = requestAnimationFrame(draw);
    }
    elapsed++;
    // console.log("elapsed: ", elapsed);
}
function addListeners(track) {
    track.onplay = function () {
        console.log("play");
        playing = true;
        raf = requestAnimationFrame(draw);
        start = Date.now();
    };
    track.onpause = function () {
        console.log("pause");
        console.log("stopping animation on frame: ", raf);
        playing = false;
        cancelAnimationFrame(raf);
        printPauseTime();
    };
    track.onended = function () {
        console.log("TRACK HAS ENDED...!");
        playing = false;
        cancelAnimationFrame(raf);
    };
    // console.log("band: 0");
    track.ontimeupdate = function (event) {
        // analyser.getByteTimeDomainData(dataArray);
        // console.log("data: ", dataArray[0]);
    };
}
function printPauseTime() {
    end = Date.now();
    var diff = end - start;
    diff /= 1000; //in seconds
    console.log("diff: ", diff);
}
function stopAudio() {
    if (audioContext) {
        audioContext.suspend();
    }
}
function resumeAudio() {
    if (audioContext) {
        audioContext.resume();
    }
}
function resetCanvas(e) {
    // console.log("reset canvas called...");
    // resize the canvas - but remember - this clears the canvas too.
    console.log("window.width: " + window.innerWidth + ", " + window.innerHeight);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //make sure we scroll to the top left.
    window.scrollTo(0, 0);
}
init();
setup();
// draw();
//# sourceMappingURL=/src/js/index.js.map