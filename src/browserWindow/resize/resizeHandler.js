/* ========================================== *
*  - win blur resize to min
*  - handle html expand event
* ========================================== */

const {ipcMain} = require('electron');
const {set_sizeExpand, set_sizeMini,set_reizeMainWindowVar} = require('./winResizefunc');

const resizeHandlerInit=(mainWindow)=>{
    let expand=true;
    set_reizeMainWindowVar(mainWindow);
    
    //mainwindow resize smaller when on blur
    let winBlur=()=>{
        console.log('winBlur');
        set_sizeMini(mainWindow);
    }
    //mainWindow.on('blur', winBlur);
    
    //handle html event
    ipcMain.on('timer:expand', (e, expand)=>{
        if(expand){
            set_sizeExpand(mainWindow);            
        }else{
            set_sizeMini(mainWindow);
        }
        console.log("timer:expand",expand);
    });    
}

module.exports = {
    resizeHandlerInit
}