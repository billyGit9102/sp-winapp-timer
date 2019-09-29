"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soundHandleInit = void 0;

var _sound = require("./sound");

var soundHandleInit = function soundHandleInit(timerControl) {
  $(document).on("sound:start", function () {
    console.log("sound:start");
    _sound.soundProcess.currentTime = 0;

    _sound.soundProcess.play();
  });
  $(document).on("sound:process", function () {
    $.post("<?php echo base_url('doing_timer/set_ticks/') . $type ?>", {
      "ticks": timerControl.getTicks(),
      "endTime": $("#endTime").val()
    }, function (respones) {
      console.log(respones + "set_ticks");
    });
    console.log("sound:process");

    _sound.soundProcess.play();
  });
  $(document).on("sound:1min", function () {
    console.log("sound:1min");

    _sound.sound1Min.play();
  });
  $(document).on("sound:2min", function () {
    console.log("sound:2min");

    _sound.sound2Min.play();
  });
  $(document).on("sound:5min", function () {
    console.log("sound:5min");

    _sound.sound5Min.play();
  });
  $(document).on("sound:End", function () {
    console.log("sound:End");
    $("body").addClass("timerAlert");
    _sound.sound2Min.loop = true;

    _sound.sound2Min.play();
  });
};

exports.soundHandleInit = soundHandleInit;