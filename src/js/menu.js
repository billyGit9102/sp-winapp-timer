import {triggerNativeEvent} from "./utility-function/eventTrigger"
import { soundProcess,sound1Min,sound2Min,sound5Min} from './sound';

const electron = window.require('electron');
const {ipcRenderer} = electron;

const soundControl=()=>{
    document.getElementById('sc-playsp').value=soundProcess.volume
    document.getElementById('sc-play1m').value=sound1Min.volume
    document.getElementById('sc-play2m').value=sound2Min.volume
    document.getElementById('sc-play5m').value=sound5Min.volume

    document.getElementById('btn-playsp').addEventListener('click',()=>{
        console.log('soundProcess.play();')
        soundProcess.play();
    })
    document.getElementById('btn-play1m').addEventListener('click',()=>{
        sound1Min.play();
    })
    document.getElementById('btn-play2m').addEventListener('click',()=>{
        sound2Min.play();
    })
    document.getElementById('btn-play5m').addEventListener('click',()=>{
        sound5Min.play();
    })
}

const menuInit=()=>{
    let isMenuOpen=false;
    const menuClose=()=>{
        isMenuOpen=false;
        document.getElementById('menuWrapper').classList.remove('show'); 
        console.log("menuClose")
    }
    const menu_handle=()=>{
        if(!isMenuOpen){
            isMenuOpen=true;
            console.log("menupress-open")
            document.getElementById('menuWrapper').classList.add('show');
        }else{
            menuClose()        
            console.log("menupress-close")
        }
    }
    document.getElementById('btn-menu').addEventListener('click', menu_handle);
    document.addEventListener('minimize',()=>{
        menuClose()
    });
    ipcRenderer.on('timer:blur', ()=>{
        menuClose()
    });

    soundControl()
}

export {menuInit}