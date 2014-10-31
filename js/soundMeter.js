'use strict';

var SoundMeter = function(context) {
  this.context = context;
  this.meter = 0.0;
  this.script = context.createScriptProcessor(2048, 1, 1);
  var that = this;
  this.script.onAudioProcess = function(event) {
    var input = event.inputBuffer.getChannelData(0);
    var sum = 0.0;
    for (var i = 0, x = input.length; i < x; i++) {
      sum += input[i] * input[i];
    }
    that.meter = Math.sqrt(sum / input.length);
  };
};

SoundMeter.prototype.connectToSource = function(stream) {
  console.log('SoundMeter connecting');
  this.mic = this.context.createMediaStreamSource(stream);
  this.mic.connect(this.script);
  this.script.connect(this.context.destination);
};

SoundMeter.prototype.stop = function() {
  this.mic.disconnect();
  this.script.disconnect();
};
