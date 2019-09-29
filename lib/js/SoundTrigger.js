"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundTrigger = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// JavaScript Document
var SoundTrigger = function SoundTrigger(endTime) {
  var _this = this;

  _classCallCheck(this, SoundTrigger);

  _defineProperty(this, "endTime", void 0);

  _defineProperty(this, "handleTicksChange", function (e) {
    //console.log("handleTicksChange");
    console.log(_this.endTime);
    var x = e.detail.ticks;
    var checkStart = x / 1000 / 3 == 1 ? true : false;
    var checkProcess = x / 1000 % 15 == 0 ? true : false;
    var check1Min = x / 1000 % 60 == 0 ? true : false;
    var check2Min = x / 1000 % 120 == 0 ? true : false;
    var check5Min = x / 1000 % 300 == 0 ? true : false;
    var checkEnd = x / 1000 % _this.endTime == 0 ? true : false;
    console.log("endTime=" + _this.endTime);
    console.log(_this);

    if (checkEnd) {
      console.log("SoundTrigger-checkEnd");
      document.dispatchEvent(new CustomEvent("sound:End"));
    }

    if (x / 1000 % 60 == 59) {
      console.log("SoundTrigger-59s");
      document.dispatchEvent(new CustomEvent("sound:10s"));
    }

    if (checkStart) {
      console.log("SoundTrigger-checkStart");
      document.dispatchEvent(new CustomEvent("sound:start"));
    }

    if (checkProcess && !check1Min && !check2Min && !check5Min && !checkEnd) {
      console.log("SoundTrigger-sound:process");
      document.dispatchEvent(new CustomEvent("sound:process"));
    }

    if (check1Min && !check2Min && !check5Min && !checkEnd) {
      console.log("SoundTrigger-1min");
      document.dispatchEvent(new CustomEvent("sound:1min"));
    }

    if (check2Min && !check5Min && !checkEnd) {
      console.log("SoundTrigger-2min");
      document.dispatchEvent(new CustomEvent("sound:2min"));
    }

    if (check5Min && !checkEnd) {
      console.log("SoundTrigger-5min");
      document.dispatchEvent(new CustomEvent("sound:5min"));
    }
  });

  _defineProperty(this, "setEndTime", function (e) {
    _this.endTime = e * 60;
    console.log("set end Time:SoundTrigger", _this.endTime);
  });

  this.endTime = endTime * 60;
  document.addEventListener("timer:ticksChange", this.handleTicksChange);
  console.log("soundTimer start", this.endTime);
  console.log(this.endTime);
};

exports.SoundTrigger = SoundTrigger;