const {watchJs,compileJs}= require('./gulp/watchJs');
const {watchHtml,compileHtml}= require('./gulp/watchHtml');
const {watchScss,compileScss}= require('./gulp/watchScss');

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
exports.compileScss=compileScss;
exports.compileHtml=compileHtml;
exports.compileJs=compileJs;