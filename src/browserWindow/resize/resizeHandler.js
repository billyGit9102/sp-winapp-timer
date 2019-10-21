/* ========================================== *
*  - win blur resize to min
*  - handle html expand event
* ========================================== */

const {ipcMain} = require('electron');
const {set_sizeExpand, set_sizeMini,set_reizeMainWindowVar} = require('./winResizefunc');

const resizeHandlerInit=(mainWindow)=>{
    
    set_reizeMainWindowVar(mainWindow);
    
    //mainwindow resize smaller when on blur
    let winBlur=()=>{
        console.log('winBlur');
        set_sizeMini(mainWindow);
    }
    const expandHandler=(e, expand)=>{
        if(expand){
            set_sizeExpand(mainWindow);            
        }else{
            set_sizeMini(mainWindow);
        }
        console.log("timer:expand",expand);
    }
    //handle html event
    ipcMain.on('htmlLoadDataDone',()=>{
        console.log('htmlLoadDataDone');  
        mainWindow.on('blur', winBlur);
        ipcMain.on('timer:expand', expandHandler);   
    }) 
}

module.exports = {
    resizeHandlerInit
}