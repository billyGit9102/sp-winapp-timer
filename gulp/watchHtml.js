const { src, dest,watch } = require('gulp');
const fileinclude = require('gulp-file-include');

function compileHtml() {
    // place code for your default task here
    console.log("watch html")
    return src(['./src/html/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('./'));
}
function watchHtml(){
    return watch(['./src/html/**/*.html'], compileHtml)
}

module.exports = {
    watchHtml
}