/* ========================================== *
*  - create browser window here
* ========================================== */

const {app} = require('electron');
const  {createWindow}=require('./src/browserWindow/mainWindow');

app.on('ready', () => setTimeout(()=>{
  //console.log("createWindow");
  //create mainWindow
  createWindow();
}, 3000));

// Quit when all windows are closed.
app.on('window-all-closed', ()=> {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});