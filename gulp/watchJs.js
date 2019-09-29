const { src, dest, watch, series  } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

function compileBrowserify(){
    return src('lib/js/app.js')
    .pipe(browserify())
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
    compileBrowserify();
    //series(compileES6js,compileBrowserify);
    cb();
}
module.exports = {
    watchJs, compileJs
}