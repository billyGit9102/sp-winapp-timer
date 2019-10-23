//const {set_sizeExpand, set_sizeMini} = require('./winResizefunc');

const {winW, winH, winW_mini, winH_mini} = require('../../globalVars');

const {saveSize} = require('../saveLoadData');

let mainWindow;
let set_reizeMainWindowVar=(mW)=>{
    mainWindow=mW;
}
let saveExpandSize=()=>{
    let data={}
    data.width=mainWindow.getSize()[0];
    data.height=mainWindow.getSize()[1];
    //saveSize(data);
    console.log('max',mainWindow.getSize())
}
const saveMinSize=()=>{
    let data={}
    data.minWidth=mainWindow.getSize()[0];
    data.minHeight=mainWindow.getSize()[1];
    //saveSize(data);
    console.log('min',mainWindow.getSize())
}
let set_sizeExpand=(mainWindow)=>{    
    //remove min size save listener
    mainWindow.removeListener('resize', saveMinSize);
    //prevent multiple expand size listener
    mainWindow.removeListener('resize', saveExpandSize);
    //save expand size listener
    mainWindow.addListener('resize', saveExpandSize);

    mainWindow.setMaximizable(true)
    mainWindow.setMinimumSize(200, 400);
    mainWindow.setMaximumSize(3000, 3000);

    console.log("set_sizeExpand");
    console.log(winW(),winH());
    mainWindow.setResizable(true);
    mainWindow.setSize(winW(),winH());      
}
let set_sizeMini=(mainWindow)=>{
    //remove big size save listener
    mainWindow.removeListener('resize', saveExpandSize);
    //prevent multiple min size listener
    mainWindow.removeListener('resize', saveMinSize);    
    mainWindow.addListener('resize', saveMinSize);

    //can't maximize in min mode
    mainWindow.setMaximizable(false)
    //restrict size
    mainWindow.setMinimumSize(150, 60);
    mainWindow.setMaximumSize(800, 60)

    //console.log("set_sizeMini");
    mainWindow.setResizable(true);
    mainWindow.setSize(winW_mini,winH_mini);

    //
    
    //mainWindow.setResizable(false);
    //mainWindow.setBounds({ width: 800, height: 60 })
}

module.exports = {
    set_sizeExpand,set_sizeMini,
    set_reizeMainWindowVar
}