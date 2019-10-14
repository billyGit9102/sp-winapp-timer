import { soundProcess,sound1Min,sound2Min,sound5Min} from './sound';
import  { triggerNativeEvent } from './utility-function/eventTrigger';

const electron = window.require('electron');
const {ipcRenderer} = electron;


const soundControl=()=>{
    const volumnSetting={};
    let mute =false

    volumnSetting.soundProcess=soundProcess.volume
    volumnSetting.sound1Min=sound1Min.volume
    volumnSetting.sound2Min=sound2Min.volume
    volumnSetting.sound5Min=sound5Min.volume

    document.getElementById('sc-playsp').value=soundProcess.volume
    document.getElementById('sc-play1m').value=sound1Min.volume
    document.getElementById('sc-play2m').value=sound2Min.volume
    document.getElementById('sc-play5m').value=sound5Min.volume
    document.getElementById('sc-playsp').addEventListener('change',(e)=>{
        soundProcess.volume=e.target.value
        volumnSetting.soundProcess=e.target.value;
    })
    document.getElementById('sc-play1m').addEventListener('change',(e)=>{
        sound1Min.volume=e.target.value;
        volumnSetting.sound1Min=e.target.value;
    })
    document.getElementById('sc-play2m').addEventListener('change',(e)=>{
        sound2Min.volume=e.target.value;
        volumnSetting.sound2Min=e.target.value;
    })
    document.getElementById('sc-play5m').addEventListener('change',(e)=>{
        sound5Min.volume=e.target.value;
        volumnSetting.sound5Min=e.target.value;
    })
    document.getElementById('btn-mute').addEventListener('click',()=>{
        if(!mute){
            mute=true;
            document.getElementById('sc-playsp').value=0;
            document.getElementById('sc-play1m').value=0;
            document.getElementById('sc-play2m').value=0;
            document.getElementById('sc-play5m').value=0;
        }else{    
            mute=false;
            document.getElementById('sc-playsp').value=volumnSetting.soundProcess;
            document.getElementById('sc-play1m').value=volumnSetting.sound1Min;
            document.getElementById('sc-play2m').value=volumnSetting.sound2Min;
            document.getElementById('sc-play5m').value=volumnSetting.sound5Min;
        }
        triggerNativeEvent(document.getElementById("sc-playsp"),'click')
        triggerNativeEvent(document.getElementById("sc-play1m"),'click')
        triggerNativeEvent(document.getElementById("sc-play2m"),'click')
        triggerNativeEvent(document.getElementById("sc-play5m"),'click')
        console.log(volumnSetting);
    })

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