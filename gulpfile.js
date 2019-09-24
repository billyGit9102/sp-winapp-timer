const {watchJs}= require('./gulp/watchJs');
const {watchHtml}= require('./gulp/watchHtml');
const {watchScss}= require('./gulp/watchScss');

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