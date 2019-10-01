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
    $("#preloader").addClass('init');
    console.log('$("#preloader").fadeIn(20)');
  }, 100);
}; //when ajax load php data finish, remove preloader html


exports.showPreloader = showPreloader;

var removePreloader = function removePreloader() {
  $("#preloader").fadeOut(300, function () {
    $("#preloader").remove();
  });
};

exports.removePreloader = removePreloader;