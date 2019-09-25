const { src, dest, watch, series  } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

function compileBrowserify(){
    return src('output/app.js')
    .pipe(browserify())
    .pipe(dest('build/'))
}
function compileES6js(){
    return src('src/js/**/*.js')
    .pipe(babel()) 
    .pipe(dest('dist/js/'));
}
function watchJs(){
    return watch(['src/js/**/*.js'], series(compileES6js,compileBrowserify));
}
module.exports = {
    watchJs
}