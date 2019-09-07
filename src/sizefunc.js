//const {set_sizeExpand, set_sizeMini} = require('./sizefunc');
const {winW, winH, winW_mini, winH_mini} = require('./globalVars');

function set_sizeExpand(mainWindow){
    mainWindow.setResizable(true);
    mainWindow.setSize(winW,winH);
}
function set_sizeMini(mainWindow){
    mainWindow.setResizable(true);
    mainWindow.setSize(winW_mini,winH_mini);
    mainWindow.setResizable(false);
}

module.exports = {
    set_sizeExpand,set_sizeMini
}