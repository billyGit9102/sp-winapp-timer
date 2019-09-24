const { src, dest,watch, series } = require('gulp');
const fileinclude = require('gulp-file-include');

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
function watchHtml(){
    return watch(['./src/html/**/*.html'], compileHtml)
}

module.exports = {
    watchHtml
}