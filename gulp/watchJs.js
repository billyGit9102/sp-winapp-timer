const { src, dest, watch, series  } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

function compileBrowserify(){
    return src('output/app.js')
    .pipe(browserify())
    .pipe(dest('build/'))
}
function compileES6js(){
    return src('src/**/*.js')
    .pipe(babel()) 
    .pipe(dest('output/'));
}
function watchJs(){
    return watch(['src/**/*.js'], series(compileES6js,compileBrowserify));
}
module.exports = {
    watchJs
}