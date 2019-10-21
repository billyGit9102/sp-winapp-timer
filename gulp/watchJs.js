const { src, dest, watch, series  } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

function compileBrowserify(){
    return src('lib/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(sourcemaps.write('../dist'))
    .pipe(dest('dist/'))
}
function compileES6js(){
    return src('src/js/**/*.js')
    .pipe(babel()) 
    .pipe(dest('lib/js/'));
}
function watchJs(){
    return watch(['src/js/**/*.js'], series(compileES6js,compileBrowserify));
}
function compileJs(cb){
    //compileES6js()
    //compileBrowserify();
    //series(compileES6js,compileBrowserify);
    cb();
}
module.exports = {
    watchJs, compileJs
}