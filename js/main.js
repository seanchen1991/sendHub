'use strict';

var volumeMeter = document.querySelector('#volume meter');
var displayValue = document.querySelector('#volume .value');

try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  window.audioContext = new AudioContext();
} catch(error) {
  alert('Web Audio API not supported.');
}

var constraints = window.constraints = {
  audio: true,
  video: false
};

navigator.getUserMedia = navigator.getUserMedia || 
                         navigator.webkitGetUserMedia || 
                         navigator.mozGetUserMedia;

var successCallback = function(stream) {
  window.stream = stream;
  var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
  soundMeter.connectToSource(stream);

  setInterval(function() {
    volumeMeter.value = displayValue.innerText = 
      soundMeter.meter.toFixed(2);
  }, 200);
}

var errorCallback = function(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
