/* ========================================== *
*  - all setting of tray icon
* ========================================== */
const {Tray, Menu,app} = require('electron');
const path=require('path');
const iconPath = path.join(__dirname, '../../icon/img-300x300.jpg');

let tray=null;

let trayInit=(mainWindow)=>{

    tray=new Tray(iconPath);
    tray.on('double-click',()=>{
        mainWindow.show();
    })
    let template = [
        {
            label: 'Open',
            click:()=>{
                mainWindow.show();
            }
        },
        {
            label: 'Close',
            click:()=>{
                mainWindow.destroy();
            }
        }
    ]
    const ctxMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(ctxMenu);
    
    tray.setToolTip('Winapp Timer');

    app.on('window-all-closed', ()=> {
        //console.log("app in tray call tray destroy")
        tray.destroy();
    })

}

module.exports = {
    trayInit
};