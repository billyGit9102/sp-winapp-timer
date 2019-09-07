/* ========================================== *
*  - create browser window
*  - use blur to control size
*  - recieve expand to control size
* ========================================== */

// const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const {app, ipcMain} = require('electron');
//const Tray = electron.Tray;
const  { createWindow }=require('./src/mainWindow');
const {set_sizeExpand, set_sizeMini} = require('./src/sizefunc');

let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => setTimeout(()=>{
  mainWindow=createWindow();
}, 3000));

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})


/* ---------------------------------------------------- *
*  ■ recieve expand to control size
* ----------------------------------------------------- */
let expand=true;
ipcMain.on('timer:expand', function(e, expand){
  if(expand){
    set_sizeExpand(mainWindow);
  }else{
    set_sizeMini(mainWindow);
  }
  console.log("timer:expand",expand);
});
ipcMain.on('appLoadDone', function(e){
  console.log("appLoadDone");
  if(expand){
    set_sizeExpand(mainWindow);
  }else{
    set_sizeMini(mainWindow);
  }

});

/*---end recieve expand to control size ---*/