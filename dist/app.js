(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./utility-function/extend":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonInit = void 0;

var _sound = require("./sound");

var _currentTime = require("./utility-function/currentTime");

var buttonInit = function buttonInit(timerControl) {
  $("#endTime").on("change", function () {
    var v = $(this).val();

    if (v == "") {
      $(this).val(0);
    }

    $.post("<?php echo base_url('doing_timer/set_ticks/') . $type ?>", {
      "ticks": timerControl.getTicks(),
      "endTime": $("#endTime").val()
    }, function (respones) {});
    soundTri.setEndTime($("#endTime").val()); //sound2Min.loop = true;
    //sound2Min.play();
    //alert(v)
  }); //button action

  var doingStTimer = ">???|-";
  var doingEndTimer = "<|";
  $("#start").on("click", function () {
    timerControl.startTimer();
    (0, _sound.activeSound)(); //$("#start").addClass("hide");

    document.getElementById("start").className = "hide"; //$("#pause").addClass("show");

    document.getElementById("pause").className = "show";
    doingStTimer = ">" + (0, _currentTime.currentTime)() + "-";
  });
  $("#pause").on("click", function () {
    timerControl.pauseTimer(); //$("#pause").addClass("hide");

    document.getElementById("pause").className = "hide"; //$("#resume").addClass("show");

    document.getElementById("resume").className = "show";
  });
  $("#resume").on("click", function () {
    timerControl.resumeTimer(); //$("#resume").addClass("hide");

    document.getElementById("resume").className = "hide"; //$("#pause").addClass("show");

    document.getElementById("pause").className = "show";
  });
  var press_stop = false;
  $("#stop").on("click", function () {
    $.post("<?php echo base_url('doing_timer/done/') . $type ?>", {}, function (respones) {
      var ct = timerControl.getCurrentTime();

      if (ct != "0s" && !press_stop) {
        press_stop = true; //get current time, then set to end time
        //$("#time").text()

        doingEndTimer = "-" + (0, _currentTime.currentTime)() + "| " + document.getElementById("curDoing").value + "\n"; //alert($("#time").text());

        var currentDoingTxtContent = $("#timeMark").val();
        currentDoingTxtContent = currentDoingTxtContent.split(" ");
        console.log(currentDoingTxtContent); //var doingTitle=[];
        //doingTitle[0]=currentDoingTxtContent[0];
        //add current done time in front

        currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer); //var output=doingTitle.concat(currentDoingTxtContent)

        var output = currentDoingTxtContent; //console.log(output[1]);
        //output[1]=output[1].substring(1);

        output = output.join(" "); //remove first row space

        output = output.replace(" >", ">");
        $("#timeMark").val(output); //$("#timeMark").trigger("change");

        timerControl.pauseTimer();
        done_timer(); //
      }
    }); //$.post("
  });
};

exports.buttonInit = buttonInit;

function done_timer() {
  var content = $("#timeMark").val(); //console.log("content-change="+content)

  $.ajax({
    url: "http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/set_content/" + window.timerType,
    data: {
      'content': content
    },
    type: "POST",
    success: function success(response) {
      setTimeout(function () {
        location.reload();
      }, 50);
    }
  });
} // 
// var flag = 0;
// $("#refresh").on("click", function() {
//     if ($(this).hasClass("active")) {
//         location.href = "index2.php";
//     } else {
//         location.href = "?refresh=1";
//     }
// });
// $("#muteSound").on("click", function() {
//     if (flag == 0)
//     {
//         $(this).addClass("active")
//         $("#muteSound").text("Restart sound");
//         flag = 1;
//         muteAllSound()
//         return;
//     }
//     if (flag == 1)
//     {
//         $(this).removeClass("active")
//         $("#muteSound").text("Mute sound");
//         flag = 0;
//         restartAllSound()
//         return;
//     }
// });
},{"./sound":5,"./utility-function/currentTime":6}],3:[function(require,module,exports){
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
},{"./Doingtimer":1,"./button":2,"./sound-handler":4}],4:[function(require,module,exports){
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
},{"./sound":5}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentTime = void 0;

var currentTime = function currentTime() {
  var newDate = new Date();
  var h = newDate.getHours();
  h = h < 10 ? "0" + h : h;
  var m = newDate.getMinutes();
  m = m < 10 ? "0" + m : m;
  var timeString = h + ":" + m;
  return timeString;
};

exports.currentTime = currentTime;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = exports.deepExtend = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//global hasOwnProperty 
var deepExtend = function deepExtend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];
    if (!obj) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (_typeof(obj[key]) === 'object') out[key] = deepExtend(out[key], obj[key]);else out[key] = obj[key];
      }
    }
  }

  return out;
}; //deepExtend({}, objA, objB);


exports.deepExtend = deepExtend;

var extend = function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
    }
  }

  return out;
};

exports.extend = extend;
},{}]},{},[3])