"use strict";

var _preloader = require("./preloader");

var _Doingtimer = require("./Doingtimer");

var _button = require("./button");

var _titleContent = require("./title-content");

var _globalVar_html = require("./globalVar_html");

var _electron = require("./electron");

var _soundEventHandle = require("./soundEventHandle");

//const electron = window.require('electron');
//const {ipcRenderer} = electron;
(function ($) {
  (0, _preloader.showPreloader)(); //htmlloadDone, old script , for when minimize refresh page in devtool, need expand the app
  //ipcRenderer.send('htmlLoadDone');
  //console.log('htmlLoadDone:sent');

  (0, _electron.ipcRendererInit)(); //console.log(this.location)       

  $.get(_globalVar_html.base_url + '/doing_timer/start/' + _globalVar_html.type, function (data) {
    $("#doingNote").val(data.title);
    $("#timeMark").val(data.content);
    $("#endTime").val(data.endTime);
    (0, _preloader.removePreloader)();
    var timerControl = new _Doingtimer.DoingTimer({
      target: document.getElementById("timer"),
      startTime: 0 //1000 = 1s

    });
    (0, _soundEventHandle.soundEventHandleInit)(timerControl);
    (0, _titleContent.titleContentInit)();
    (0, _button.buttonActionInit)(timerControl);
  }, "json");
})(jQuery); //--end (function ($) {