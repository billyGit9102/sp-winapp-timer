const { src, dest,watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

function compileScss() {
    console.log("watching scss")
    return src('./src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))    
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./dist/'));
}
function watchScss(){
    return watch(['./src/scss/**/*.scss'], compileScss);
}
module.exports = {
    watchScss,compileScss
}