(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoingTimer = void 0;

var _extend = require("./utility-function/extend");

var _SoundEventDispatch = require("./SoundEventDispatch");

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

  _defineProperty(this, "soundEventDispatch", void 0);

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

  _defineProperty(this, "setEndTime", function () {
    _this.soundEventDispatch.setEndTime(document.getElementById("endTime").value);

    console.log("setEndTimer in timecontrol");
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
  this.soundEventDispatch = new _SoundEventDispatch.SoundEventDispatch(document.getElementById("endTime").value);
  console.log("DoingTimer-start");
  console.log(this.setting);
  console.log(this.ms, "===tart-dt");
}; //let ele=document.getElementById("timer");


exports.DoingTimer = DoingTimer;
},{"./SoundEventDispatch":2,"./utility-function/extend":12}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundEventDispatch = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// JavaScript Document
var SoundEventDispatch = function SoundEventDispatch(endTime) {
  var _this = this;

  _classCallCheck(this, SoundEventDispatch);

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

exports.SoundEventDispatch = SoundEventDispatch;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonActionInit = void 0;

var _sound = require("./sound");

var _currentTime = require("./utility-function/currentTime");

var _globalVar_html = require("./globalVar_html.js");

var _this = void 0;

var buttonActionInit = function buttonActionInit(timerControl) {
  document.getElementById("endTime").addEventListener("change", function (e) {
    console.log(_this, 'end time press11');
    var v = e.target.value;

    if (v == "") {
      e.target.value = 0;
    }

    $.post(_globalVar_html.base_url + 'doing_timer/set_ticks/' + _globalVar_html.type, {
      "ticks": timerControl.getTicks(),
      "endTime": e.target.value
    }, function (respones) {});
    timerControl.setEndTime(e.target.value);
  }); //button action

  var doingStTimer = ">???|-";
  var doingEndTimer = "<|";
  document.getElementById("start").addEventListener("click", function () {
    timerControl.startTimer();
    (0, _sound.activeSound)(); //$("#start").addClass("hide");

    document.getElementById("start").className = "hide"; //$("#pause").addClass("show");

    document.getElementById("pause").className = "show";
    doingStTimer = ">" + (0, _currentTime.currentTime)() + "-";
  });
  document.getElementById("pause").addEventListener("click", function () {
    timerControl.pauseTimer(); //$("#pause").addClass("hide");

    document.getElementById("pause").className = "hide"; //$("#resume").addClass("show");

    document.getElementById("resume").className = "show";
  });
  document.getElementById("resume").addEventListener("click", function () {
    timerControl.resumeTimer(); //$("#resume").addClass("hide");

    document.getElementById("resume").className = "hide"; //$("#pause").addClass("show");

    document.getElementById("pause").className = "show";
  });
  var press_stop = false;
  document.getElementById("stop").addEventListener("click", function () {
    $.post(_globalVar_html.base_url + 'doing_timer/done/' + _globalVar_html.type, {}, function (respones) {
      var ct = timerControl.getCurrentTime();

      if (ct != "0s" && !press_stop) {
        //let curDoingTask=prompt("type task name");
        press_stop = true; //get current time, then set to end time
        //$("#time").text()

        doingEndTimer = "-" + (0, _currentTime.currentTime)() + "| " + document.getElementById("curDoing").value + " \n"; //+ ' ' + curDoingTask
        //alert($("#time").text());

        var currentDoingTxtContent = document.getElementById("timeMark").value;
        currentDoingTxtContent = currentDoingTxtContent.split(" ");
        console.log(currentDoingTxtContent); //var doingTitle=[];
        //doingTitle[0]=currentDoingTxtContent[0];
        //add current done time in front

        currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer); //var output=doingTitle.concat(currentDoingTxtContent)

        var output = currentDoingTxtContent; //console.log(output[1]);
        //output[1]=output[1].substring(1);

        output = output.join(" "); //remove first row space

        output = output.replace(" >", ">");
        document.getElementById("timeMark").value = output; //$("#timeMark").trigger("change");

        timerControl.pauseTimer();
        done_timer(); //
      }
    }); //$.post("
  });
};

exports.buttonActionInit = buttonActionInit;

function done_timer() {
  var content = document.getElementById("timeMark").value; //console.log("content-change="+content)

  $.ajax({
    url: _globalVar_html.base_url + "doing_timer/set_content/" + _globalVar_html.type,
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
},{"./globalVar_html.js":6,"./sound":8,"./utility-function/currentTime":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ipcRendererInit = void 0;

/* ========================================== *
*  
*  1. handle expand button click event
*  2. response to electron main window event
*  
* ========================================== */
var electron = window.require('electron');

var ipcRenderer = electron.ipcRenderer;
/* ---------------------------------------------------- *
*  1. handle expand button click event
* ----------------------------------------------------- */

var ipcRendererInit = function ipcRendererInit() {
  var bodyele = document.getElementsByTagName("body")[0];
  var is_expand = true;

  function toggleExpand_handle(e) {
    e.preventDefault();
    console.log("is_expand", is_expand);
    is_expand = bodyele.classList.contains("expand");

    if (is_expand) {
      bodyele.classList.remove("expand"); //bodyele.className="";
    } else {
      bodyele.classList.add("expand"); //bodyele.className="expand";
    }

    is_expand = bodyele.classList.contains("expand");
    ipcRenderer.send('timer:expand', is_expand);
    console.log("expand btn click");
  }

  document.getElementById('expander').addEventListener('click', toggleExpand_handle); //document.getElementById('curDoing').addEventListener('focus', toggleExpand_handle);

  /* ---------------------------------------------------- *
  *  2. response to electron main window timer:blur event
  * ----------------------------------------------------- */

  ipcRenderer.on('timer:blur', function (e, item) {
    console.log('timer:blur'); //bodyele.className="";

    bodyele.classList.remove("expand");
  });
  ipcRenderer.on('timer:max', function (e, item) {
    console.log('timer:max');
    bodyele.classList.add("max");
    bodyele.classList.add("expand");
  });
  ipcRenderer.on('appStart', function (e) {
    console.log('appStart'); //bodyele.className="expand";
  });
};

exports.ipcRendererInit = ipcRendererInit;
},{}],5:[function(require,module,exports){
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
  (0, _preloader.showPreloader)();
  (0, _electron.ipcRendererInit)(); //console.log(this.location)       

  $.get(_globalVar_html.base_url + '/doing_timer/start/' + _globalVar_html.type, function (data) {
    document.getElementById("doingNote").value = data.title;
    document.getElementById("timeMark").value = data.content;
    document.getElementById("endTime").value = data.endTime;
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
},{"./Doingtimer":1,"./button":3,"./electron":4,"./globalVar_html":6,"./preloader":7,"./soundEventHandle":9,"./title-content":10}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports.base_url = void 0;
var base_url = "http://bf2c.info/sp/project/ci-doing-timer-v5/";
exports.base_url = base_url;
var type = "home";
exports.type = type;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePreloader = exports.showPreloader = void 0;

//only show preloader when load time exsist 100ms, 
//because want to show preloader only when app start
//prevent the loader show when refresh page
var showPreloader = function showPreloader() {
  setTimeout(function () {
    document.getElementById("preloader").classList.add('init');
    console.log('$("#preloader").fadeIn(20)');
  }, 100);
}; //when ajax load php data finish, remove preloader html


exports.showPreloader = showPreloader;

var removePreloader = function removePreloader() {
  document.getElementById("preloader").classList.add('fadeout');
  setTimeout(function () {
    document.getElementById("preloader").classList.remove('init');
    document.getElementById("preloader").classList.remove('fadeout');
    var parent = document.getElementsByTagName('body')[0];
    var child = document.getElementById('preloader');
    parent.removeChild(child);
  }, 350);
};

exports.removePreloader = removePreloader;
},{}],8:[function(require,module,exports){
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
    console.log("activeSound");
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
},{}],9:[function(require,module,exports){
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
      "endTime": document.getElementById("endTime").value
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
    document.getElementsByTagName('body')[0].classList.add('timerAlert'); //$("body").addClass("timerAlert");

    $("#expander").trigger('click');
    _sound.sound2Min.loop = true;

    _sound.sound2Min.play();
  });
};

exports.soundEventHandleInit = soundEventHandleInit;
},{"./globalVar_html.js":6,"./sound":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.titleContentInit = void 0;

var _globalVar_html = require("./globalVar_html.js");

var titleContentInit = function titleContentInit() {
  var ele_doingNote = document.getElementById("doingNote");
  update_curDoing(ele_doingNote.value);

  function change_curDoing_handler(e) {
    console.log(document.getElementById("curDoing").value);
    update_DoingNote(document.getElementById("curDoing").value);
  }

  document.getElementById("curDoing").addEventListener("change", change_curDoing_handler);

  function update_DoingNote(str) {
    ele_doingNote.value = ele_doingNote.value.replace(/.*/, str);
    $("#doingNote").trigger("change");
  }

  function update_curDoing(str) {
    document.getElementById("curDoing").value = str.match(/.*/)[0];
  }

  document.getElementById("doingNote").addEventListener("change", function (e) {
    var title = e.target.value;
    update_curDoing(title);
    console.log(title);
    $.ajax({
      url: _globalVar_html.base_url + 'doing_timer/set_title/' + _globalVar_html.type,
      data: {
        'title': title
      },
      type: "POST",
      success: function success(response) {
        console.log("set-title=" + response);
      }
    });
  });
  document.getElementById("timeMark").addEventListener("change", function (e) {
    var content = e.target.value;
    console.log("content-change=" + content);
    $.ajax({
      url: "http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/set_content/" + window.timerType,
      data: {
        'content': content
      },
      type: "POST",
      success: function success(response) {
        console.log(response);
      }
    });
  });
};

exports.titleContentInit = titleContentInit;
},{"./globalVar_html.js":6}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}]},{},[5])