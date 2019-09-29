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