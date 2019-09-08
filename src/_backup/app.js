import createWindow from "./createWindow";

// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
//const Tray = electron.Tray;
const path=require('path');
const iconPath = path.join(__dirname, './icon/img-300x300.jpg');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let winW=600;
let winH=600;
let winW_mini=150;
let winH_mini=60;
let tray=null;

app.on('ready', () => setTimeout(createWindow, 3000));

/*------------end create browser window---*/


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})