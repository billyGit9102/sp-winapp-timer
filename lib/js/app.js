"use strict";

var _soundHandler = require("./sound-handler");

var _Doingtimer = require("./Doingtimer");

var _button = require("./button");

(function ($) {
  $.get("http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/start/home", function (data) {
    $(".result").html(data); //console.log(data.endTime );

    $("#doingNote").val(data.title);
    $("#timeMark").val(data.content);
    $("#endTime").val(data.endTime);
  }, "json");
  var timerControl = new _Doingtimer.DoingTimer({
    target: document.getElementById("timer"),
    startTime: 500
  });
  (0, _soundHandler.soundHandleInit)(timerControl);
  (0, _button.buttonInit)(timerControl);
})(jQuery); //--end (function ($) {