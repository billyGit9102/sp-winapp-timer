const {Tray, Menu} = require('electron');
const path=require('path');
const iconPath = path.join(__dirname, '../../icon/img-300x300.jpg');
let tray=null;

function traySetting(mainWindow){

    tray=new Tray(iconPath);
    tray.on('double-click',function(){
        mainWindow.show();
    })
    let template = [
        {
            label: 'Audio',
            submenu:[
                {
                    label:'Low',
                    type:'radio',
                    checked: true
                },
                {
                    label:'High',
                    type:'radio'
                }
            ]
        },
        {
            label: 'Video',
            submenu:[
                {
                    label:'Low',
                    type:'radio',
                    checked: true
                },
                {
                    label:'High',
                    type:'radio'
                }
            ]
        }
    ]
    const ctxMenu = Menu.buildFromTemplate(template);

    tray.setContextMenu(ctxMenu);
    tray.setToolTip('Doing Timer');
}

module.exports = {
    traySetting
};