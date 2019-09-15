//const {set_sizeExpand, set_sizeMini} = require('./winResizefunc');

const {winW, winH, winW_mini, winH_mini} = require('../../globalVars');
const {saveSize} = require('../saveLoadSize');

let mainWindow;
let set_reizeMainWindowVar=(mW)=>{
    mainWindow=mW;
}
let saveSizeWrap=()=>{
    saveSize(mainWindow);
}
let set_sizeExpand=(mainWindow)=>{
    console.log("set_sizeExpand");
    mainWindow.setResizable(true);
    mainWindow.setSize(winW(),winH());
    //prevent multiple saveSize
    mainWindow.removeListener('resize', saveSizeWrap);
    mainWindow.addListener('resize', saveSizeWrap);
    //console.log(mainWindow._events.resize);
    console.log(Array(mainWindow._events.resize).indexOf(saveSize));
}
let set_sizeMini=(mainWindow)=>{
    console.log("set_sizeMini");
    mainWindow.removeListener('resize', saveSizeWrap);
    mainWindow.setResizable(true);
    mainWindow.setSize(winW_mini,winH_mini);
    mainWindow.setResizable(false);
}

module.exports = {
    set_sizeExpand,set_sizeMini,set_reizeMainWindowVar
}