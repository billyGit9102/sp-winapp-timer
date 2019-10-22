//const {set_sizeExpand, set_sizeMini} = require('./winResizefunc');

const {winW, winH, winW_mini, winH_mini} = require('../../globalVars');
const {saveSize} = require('../saveLoadSize');

let mainWindow;
let set_reizeMainWindowVar=(mW)=>{
    mainWindow=mW;
}
let saveSizeWrap=()=>{
    saveSize(mainWindow);
    console.log('max',mainWindow.getSize())
}
const saveMinSize=(e)=>{
    let size=mainWindow.getSize();
    console.log('min',size)
}
// let set_sizeExpand=(mainWindow)=>{
//     mainWindow.setMaximizable(true)
//     mainWindow.setMinimumSize(200, 400);
//     mainWindow.setMaximumSize(3000, 3000);

//     console.log("set_sizeExpand");
//     console.log(winW(),winH());
//     mainWindow.setResizable(true);
//     mainWindow.setSize(winW(),winH());

      
//     mainWindow.removeListener('resize', saveMinSize);
//     //prevent multiple saveSize
//     mainWindow.removeListener('resize', saveSizeWrap);
//     mainWindow.addListener('resize', saveSizeWrap);
// }
// let set_sizeMini=(mainWindow)=>{
//     //can't maximize in min mode
//     mainWindow.setMaximizable(false)
//     //restrict size
//     mainWindow.setMinimumSize(150, 60);
//     mainWindow.setMaximumSize(800, 60)

//     //console.log("set_sizeMini");
//     mainWindow.setResizable(true);
//     mainWindow.setSize(winW_mini,winH_mini);

//     //remove big size save listener
//     mainWindow.removeListener('resize', saveSizeWrap);
//     //
//     mainWindow.removeListener('resize', saveMinSize);    
//     mainWindow.addListener('resize', saveMinSize);

//     //mainWindow.setResizable(false);
//     //mainWindow.setBounds({ width: 800, height: 60 })
// }

module.exports = {
    //set_sizeExpand,set_sizeMini,
    set_reizeMainWindowVar
}