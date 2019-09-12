
const {ipcMain} = require('electron');
const {set_sizeExpand, set_sizeMini} = require('./winResizefunc');


const resizeHandlerInit=(mainWindow)=>{
    let expand=true;
    
    ipcMain.on('timer:expand', function(e, expand){
        if(expand){
            set_sizeExpand(mainWindow);            
        }else{
            set_sizeMini(mainWindow);
        }
        console.log("timer:expand",expand);
    });
    
    ipcMain.on('appLoadDone', function(){
        console.log("appLoadDone");
        if(expand){
            set_sizeExpand(mainWindow);
        }else{
            set_sizeMini(mainWindow);
        }
    });



}

module.exports = {
    resizeHandlerInit
}