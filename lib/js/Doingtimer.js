"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoingTimer = void 0;

var _extend = require("./utility-function/extend");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DoingTimer = function DoingTimer(option) {
  var _this = this;

  _classCallCheck(this, DoingTimer);

  _defineProperty(this, "setting", void 0);

  _defineProperty(this, "ms", void 0);

  _defineProperty(this, "target", void 0);

  _defineProperty(this, "endTime", void 0);

  _defineProperty(this, "intervalTimer", void 0);

  _defineProperty(this, "currentTime", void 0);

  _defineProperty(this, "_findMilesecond", function (x) {
    /*
    1000 = 1s 
    remain is the value
    # eg1
    ms = 100/100 = 1
    1ms
    # eg2
    ns = 2500/100 = 25, exceed 10 is not correct, so add a %10
    25%10=5
    5ms
    */
    var result;
    result = Math.round(x / 100) % 10;
    return result;
  });

  _defineProperty(this, "_findSecond", function (x) {
    /*
    first, you need to know what value u want
    # find second		
    1000/1000 = 1
    2000/1000 = 2
    20000/1000 = 20
    90000/1000 = 90 <-- exceed 60 should not count, 
    so %60. the value should be 30 
    		(x/1000) get second
    %60, adjust to correct value
    */
    var result;
    result = x / 1000 % 60;
    result = String(result).split(".")[0];
    return result;
  });

  _defineProperty(this, "_findMinute", function (x) {
    /*
    (x/1000/60) get min
    exceed 60 min is hour, so %60 , adjust to correct value
    */
    var result;
    result = x / 1000 / 60 % 60;
    result = String(result).split(".")[0];
    return result;
  });

  _defineProperty(this, "_findHour", function (x) {
    var result;
    result = x / 1000 / 60 / 60;
    result = String(result).split(".")[0];
    return result;
  });

  _defineProperty(this, "_counter", function () {
    _this.ms += 100; //console.log(this);

    _this._displayTime();

    _this._dispatchTicksEvent();
  });

  _defineProperty(this, "_dispatchTicksEvent", function () {
    document.dispatchEvent(new CustomEvent("timer:ticksChange", {
      detail: {
        "ticks": _this.ms
      }
    })); //console.log("dispatchEvent - timer:ticksChange");
  });

  _defineProperty(this, "_displayTime", function () {
    var result;
    result = "";

    var h = _this._findHour(_this.ms);

    var m = _this._findMinute(_this.ms);

    var s = _this._findSecond(_this.ms); //let ss=this._findMilesecond(this.ms);


    result += h > 0 ? h + "h" : "";
    result += m > 0 ? m + "m" : "";
    result += s > 0 ? s + "s" : "0s"; //result+=ss>0?ss+"":ss+"";

    _this.currentTime = result;

    if (result == "0s0") {
      result = "Timer";
    } //console.log("_displayTime")
    //console.log(this.endTime)
    //document.getElementById("timer").innerHTML=result;
    //console.log(this.target);


    _this.target.innerHTML = result;
  });

  _defineProperty(this, "startTimer", function () {
    _this.intervalTimer = setInterval(_this._counter, 100);
    console.log("startTimer()221");
  });

  _defineProperty(this, "pauseTimer", function () {
    clearInterval(_this.intervalTimer);
  });

  _defineProperty(this, "resumeTimer", function () {
    _this.intervalTimer = setInterval(_this._counter, 100);
  });

  _defineProperty(this, "getTicks", function () {
    return _this.ms;
  });

  _defineProperty(this, "getCurrentTime", function () {
    return _this.currentTime;
  });

  _defineProperty(this, "addTime", function (second) {
    _this.ms = _this.ms + second * 60000;

    _this._displayTime();
  });

  this.setting = (0, _extend.extend)({
    target: {
      name: "default"
    },
    "startTime": 0,
    "endTime": 0
  }, option || {});
  this.target = this.setting.target;
  this.ms = this.setting.startTime;
  this.endTime = this.setting.endTime * 60;
  this.intervalTimer = "";
  console.log("DoingTimer-start");
  console.log(this.setting);
  console.log(this.ms, "===tart-dt");
}; //let ele=document.getElementById("timer");


exports.DoingTimer = DoingTimer;