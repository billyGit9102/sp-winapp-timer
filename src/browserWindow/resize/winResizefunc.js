//const {set_sizeExpand, set_sizeMini} = require('./winResizefunc');

const {winW, winH, winW_mini, winH_mini} = require('../../globalVars');
const {saveSize} = require('../saveLoadSize');

function set_sizeExpand(mainWindow){
    console.log("set_sizeExpand");
    mainWindow.setResizable(true);
    mainWindow.setSize(winW(),winH());
    mainWindow.addListener('resize', saveSize);
}
function set_sizeMini(mainWindow){
    console.log("set_sizeMini");
    mainWindow.removeListener('resize', saveSize);
    mainWindow.removeListener('resize', saveSize);
    mainWindow.removeListener('resize', saveSize);
    mainWindow.setResizable(true);
    mainWindow.setSize(winW_mini,winH_mini);
    mainWindow.setResizable(false);
}

module.exports = {
    set_sizeExpand,set_sizeMini
}