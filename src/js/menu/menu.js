import  { triggerNativeEvent } from '../utility-function/eventTrigger';
import  { soundControl } from './menuSoundControl';

const electron = window.require('electron');
const {ipcRenderer} = electron;

const menuInit=()=>{
    let isMenuOpen=false;
    const triggerMenuClose=()=>{
        if(isMenuOpen){
            triggerNativeEvent(document.getElementById('btn-menu'),'click');
        } 
    }
    const menu_handle=()=>{
        if(!isMenuOpen){
            isMenuOpen=true;
            console.log("menupress-open")
            document.getElementById('btn-menu').classList.add('active');
            document.getElementById('menuWrapper').classList.add('active');
            document.getElementById('menuBg').classList.add('active');
        }else{
            isMenuOpen=false;
            console.log("menupress-close")
            document.getElementById('btn-menu').classList.remove('active');
            document.getElementById('menuWrapper').classList.remove('active'); 
            document.getElementById('menuBg').classList.remove('active');
        }
    }
    document.getElementById('btn-menu').addEventListener('click', menu_handle);
    document.addEventListener('minimize',()=>{
        triggerMenuClose();
    });
    ipcRenderer.on('timer:blur', ()=>{
        triggerMenuClose();
    });    
    document.getElementById('menuBg').addEventListener('click', ()=>{
        triggerMenuClose();
    });
    soundControl();
}

export {menuInit}