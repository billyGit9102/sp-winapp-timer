const { src, dest,watch } = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

function compileScss() {
    // body omitted
    console.log("watching scss")
    return src('./src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))    
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./dist/'));
}
function compileHtml(cb) {
    // place code for your default task here
    console.log("watch html")
    src(['./src/html/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('./'));

    cb();
}
function watchSrc() {
    console.log("watching src");
    watch(['./src/scss/**/*.scss'], compileScss);
    watch(['./src/html/**/*.html'], compileHtml)
}

function defaultTask(cb) {
    // place code for your default task here
    console.log("start")
    cb();
}


exports.default = defaultTask;
exports.gw=watchSrc;