const {BrowserWindow} = require('electron');
const {winW, winH} = require('../globalVars');
const {resizeHandlerInit} = require('./resize/resizeHandler');
const {trayInit} = require('./traySetting');

let mainWindow;

let createWindow=()=>{
  console.log('winW(),winH()')
  console.log(winW(),winH())
  mainWindow = new BrowserWindow({
    width: winW(),
    height: winH(),
    frame: false,
    alwaysOnTop: true,
    //skipTaskbar:true,
    minimizable:false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile("./index.html");
  console.log(mainWindow.webContents.getURL());
  //http://bf2c.info/sp/project/ci-doing-timer-v4/doing_timer/start/home?abc
  //trayInit(mainWindow);
  resizeHandlerInit(mainWindow);
  //mainWindow.webContents.openDevTools();

  // mainWindow.webContents.on('did-finish-load',()=>{
  //   console.log("app first load")
  // });

  let winBlur=()=>{   
    console.log('winBlur222');
    mainWindow.webContents.send('timer:blur');
    //prevent slow connection problem
    mainWindow.webContents.once('dom-ready', () => {  mainWindow.webContents.send('appStart'); });
  }
  mainWindow.on('blur', winBlur);

  mainWindow.on('maximize', ()=>{
    //console.log("window max");
    mainWindow.webContents.send('timer:max');
  })

  mainWindow.on('closed', ()=>{
    mainWindow = null
  })
  //prevent slow connection problem
  mainWindow.webContents.once('dom-ready', () => {  mainWindow.webContents.send('appStart'); });
  
  return mainWindow;
}

module.exports = {
  createWindow
}