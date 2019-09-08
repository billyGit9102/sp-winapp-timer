/* ========================================== *
*  - create browser window
*  - use blur to control size
*  - recieve expand to control size
* ========================================== */

const {app} = require('electron');
const  {createWindow}=require('./src/browserWindow/mainWindow');
const  {ipcMainHandlerInit}=require('./src/ipcMainHandler');

let mainWindow;

app.on('ready', () => setTimeout(()=>{
  console.log("createWindow");
  mainWindow=createWindow();
  ipcMainHandlerInit(mainWindow);
}, 3000));


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})