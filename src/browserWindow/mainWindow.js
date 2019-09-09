const {BrowserWindow} = require('electron');
const {winW, winH} = require('../globalVars');
const {set_sizeMini} = require('./winResizefunc');
const {trayInit} = require('./traySetting');

let createWindow=()=>{
  
  let mainWindow = new BrowserWindow({
    width: winW(),
    height: winH(),
    frame: false,
    alwaysOnTop: true,
    skipTaskbar:true,
    //resizable:false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL("http://bf2c.info/sp/project/ci-doing-timer-v4/doing_timer/start/home?abc");

  trayInit(mainWindow);

  //mainWindow.webContents.openDevTools()

  /* ---------------------------------------------------- *
  *  ■ use blur to control size, use in on blur, on minimize
  * ----------------------------------------------------- */
  function winBlur(){
    set_sizeMini(mainWindow);
    mainWindow.webContents.send('timer:blur');
    mainWindow.webContents.once('dom-ready', () => {  mainWindow.webContents.send('appStart'); });
  }
  mainWindow.on('blur', winBlur);

  mainWindow.on('maximize', function () {
    console.log("window max");
    mainWindow.webContents.send('timer:max');
    //mainWindow.removeListener('blur', winBlur);
  })

  mainWindow.on('minimize', function () {
    console.log("window min");
    mainWindow.webContents.send('timer:blur');
  })
  /*------------end use blur to control size---*/

  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.webContents.once('dom-ready', () => {  mainWindow.webContents.send('appStart'); });
  
  
  
  
  return mainWindow;

}

module.exports = {
  createWindow
}