//const {set_sizeExpand, set_sizeMini} = require('./winResizefunc');

const {winW, winH, winW_mini, winH_mini} = require('../globalVars');
const {saveSize} = require('./saveLoadSize');

function set_sizeExpand(mainWindow){
    mainWindow.setResizable(true);
    mainWindow.setSize(winW(),winH());
    mainWindow.on('resize', saveSize);
}
function set_sizeMini(mainWindow){
    mainWindow.removeListener('resize', saveSize);
    mainWindow.setResizable(true);
    mainWindow.setSize(winW_mini,winH_mini);
    mainWindow.setResizable(false);
}

module.exports = {
    set_sizeExpand,set_sizeMini
}