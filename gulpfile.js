<<<<<<< HEAD
const { src, dest,watch } = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
=======
const {watchJs}= require('./gulp/watchJs');
const {watchHtml}= require('./gulp/watchHtml');
const {watchScss}= require('./gulp/watchScss');
>>>>>>> 86529c1fa84108425bd75030372193ec7e5692b9

function watchSrc() {
    console.log("watching src");
    watchJs();
    watchHtml();
    watchScss();
}
function defaultTask(cb) {
    // place code for your default task here
    console.log("start")
    cb();
}

exports.default = defaultTask;
exports.gw=watchSrc;