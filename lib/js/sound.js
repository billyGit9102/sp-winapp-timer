"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sound5Min = exports.sound2Min = exports.sound1Min = exports.soundProcess = exports.activeSound = void 0;
var soundArray = ["sound:process", "sound:1min", "sound:2min", "sound:5min"];
var restartTime = [3, 4, 3, 10];
var soundProcess = document.getElementById("sound:process");
exports.soundProcess = soundProcess;
soundProcess.volume = 1;
var sound1Min = document.getElementById("sound:1min");
exports.sound1Min = sound1Min;
sound1Min.volume = 0.1;
var sound2Min = document.getElementById("sound:2min");
exports.sound2Min = sound2Min;
sound2Min.volume = 0.05;
var sound5Min = document.getElementById("sound:5min");
exports.sound5Min = sound5Min;
sound5Min.volume = 1;

var activeSound = function activeSound() {
  var _loop = function _loop() {
    console.log(soundArray[i]);
    s = document.getElementById(soundArray[i]);
    s.muted = true;
    s.play();
    console.log(s.volume);
    var x = s;
    setTimeout(function () {
      x.muted = false;
    }, restartTime[i] * 1000);
  };

  for (var i = 0; i < soundArray.length; i++) {
    var s;

    _loop();
  }
}; //response for sound trigger
// const muteAllSound=()=>{
//      soundProcess.muted = true;
//      sound1Min.muted = true;
//      sound2Min.muted = true;
//      sound5Min.muted = true;
// }
// const restartAllSound=()=> {
//      soundProcess.muted = false;
//      sound1Min.muted = false;
//      sound2Min.muted = false;
//      sound5Min.muted = false;
// }


exports.activeSound = activeSound;