"use strict";

var _soundHandler = require("./sound-handler");

var _Doingtimer = require("./Doingtimer");

var _button = require("./button");

var _titleContent = require("./title-content");

var _globalVar_html = require("./globalVar_html.js");

var _electron = require("./electron.js");

var _SoundTrigger = require("./SoundTrigger.js");

var electron = window.require('electron');

var ipcRenderer = electron.ipcRenderer;

(function ($) {
  ipcRenderer.send('appLoadDone');
  console.log('appLoadDone:sent');
  $.get(_globalVar_html.base_url + '/doing_timer/start/' + _globalVar_html.type, function (data) {
    $(".result").html(data); //console.log(data.endTime );

    $("#doingNote").val(data.title);
    $("#timeMark").val(data.content);
    $("#endTime").val(data.endTime);
    var timerControl = new _Doingtimer.DoingTimer({
      target: document.getElementById("timer"),
      startTime: 500
    });
    var soundTri = new _SoundTrigger.SoundTrigger(document.getElementById("endTime").value);
    (0, _titleContent.titleContentInit)();
    (0, _electron.ipcRendererInit)();
    (0, _soundHandler.soundHandleInit)(timerControl);
    (0, _button.buttonInit)(timerControl, soundTri);
  }, "json");
})(jQuery); //--end (function ($) {