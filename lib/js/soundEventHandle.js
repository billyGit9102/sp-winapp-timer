"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soundEventHandleInit = void 0;

var _sound = require("./sound");

var _globalVar_html = require("./globalVar_html.js");

var soundEventHandleInit = function soundEventHandleInit(timerControl) {
  document.addEventListener("sound:start", function () {
    console.log("sound:start");
    _sound.soundProcess.currentTime = 0;

    _sound.soundProcess.play();
  });
  document.addEventListener("sound:process", function () {
    $.post(_globalVar_html.base_url + 'doing_timer/set_ticks/' + _globalVar_html.type, {
      "ticks": timerControl.getTicks(),
      "endTime": $("#endTime").val()
    }, function (respones) {
      console.log(respones + "set_ticks");
    });
    console.log("sound:process");

    _sound.soundProcess.play();
  });
  document.addEventListener("sound:1min", function () {
    console.log("sound:1min");

    _sound.sound1Min.play();
  });
  document.addEventListener("sound:2min", function () {
    console.log("sound:2min");

    _sound.sound2Min.play();
  });
  document.addEventListener("sound:5min", function () {
    console.log("sound:5min");

    _sound.sound5Min.play();
  });
  document.addEventListener("sound:End", function () {
    console.log("sound:End");
    $("body").addClass("timerAlert");
    $("#expander").trigger('click');
    _sound.sound2Min.loop = true;

    _sound.sound2Min.play();
  });
};

exports.soundEventHandleInit = soundEventHandleInit;