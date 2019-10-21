import { soundProcess,sound1Min,sound2Min,sound5Min, defaultVolume} from './sound';
import  { triggerNativeEvent } from './utility-function/eventTrigger';

const electron = window.require('electron');
const {ipcRenderer} = electron;
const volumnSetting={};

const saveVolume=()=>{
    //save volume to volumnSetting for rest sound
    volumnSetting.soundProcess=soundProcess.volume
    volumnSetting.sound1Min=sound1Min.volume
    volumnSetting.sound2Min=sound2Min.volume
    volumnSetting.sound5Min=sound5Min.volume
}
const setDefaultVolume=()=>{
    //save volume to volumnSetting for rest sound
    document.getElementById('sc-playsp').value=defaultVolume[0];
    document.getElementById('sc-play1m').value=defaultVolume[1];
    document.getElementById('sc-play2m').value=defaultVolume[2];
    document.getElementById('sc-play5m').value=defaultVolume[3];
}

const setVolume=()=>{
    soundProcess.volume=document.getElementById('sc-playsp').value
    sound1Min.volume=document.getElementById('sc-play1m').value
    sound2Min.volume=document.getElementById('sc-play2m').value
    sound5Min.volume=document.getElementById('sc-play5m').value
}
const soundControl=()=>{
    let mute =false
    saveVolume();    

    document.getElementById('sc-playsp').value=soundProcess.volume
    document.getElementById('sc-play1m').value=sound1Min.volume
    document.getElementById('sc-play2m').value=sound2Min.volume
    document.getElementById('sc-play5m').value=sound5Min.volume

    document.getElementById('sc-playsp').addEventListener('change',(e)=>{
        console.log('setting sc-playsp')
        soundProcess.volume=e.target.value
        saveVolume();
    })
    document.getElementById('sc-play1m').addEventListener('change',(e)=>{
        sound1Min.volume=e.target.value;
        saveVolume();
    })
    document.getElementById('sc-play2m').addEventListener('change',(e)=>{
        sound2Min.volume=e.target.value;
        saveVolume();
    })
    document.getElementById('sc-play5m').addEventListener('change',(e)=>{
        sound5Min.volume=e.target.value;
        saveVolume();
    })
    document.getElementById('btn-mute').addEventListener('click',()=>{
        document.getElementById('sc-playsp').value=0;
        document.getElementById('sc-play1m').value=0;
        document.getElementById('sc-play2m').value=0;
        document.getElementById('sc-play5m').value=0;       
        setVolume();
        console.log(volumnSetting);
    })
    document.getElementById('btn-resetSound').addEventListener('click',()=>{
        document.getElementById('sc-playsp').value=volumnSetting.soundProcess;
        document.getElementById('sc-play1m').value=volumnSetting.sound1Min;
        document.getElementById('sc-play2m').value=volumnSetting.sound2Min;
        document.getElementById('sc-play5m').value=volumnSetting.sound5Min;
        setVolume();
        saveVolume(); 
    })    
    document.getElementById('btn-hardResetSound').addEventListener('click',()=>{
        setDefaultVolume();
        setVolume();
        saveVolume();
    })

    document.getElementById('btn-playsp').addEventListener('click',()=>{
        //console.log('soundProcess.play();')
        //soundProcess.play();
        document.dispatchEvent(new CustomEvent("sound:process"));
    })
    document.getElementById('btn-play1m').addEventListener('click',()=>{
        sound1Min.play();
        document.dispatchEvent(new CustomEvent("sound:1min"));
    })
    document.getElementById('btn-play2m').addEventListener('click',()=>{
        sound2Min.play();
        document.dispatchEvent(new CustomEvent("sound:2min"));
    })
    document.getElementById('btn-play5m').addEventListener('click',()=>{
        sound5Min.play();
        document.dispatchEvent(new CustomEvent("sound:5min"));
    })


}

const menuInit=()=>{
    let isMenuOpen=false;
    const menuClose=()=>{
        isMenuOpen=false;
        document.getElementById('menuWrapper').classList.remove('active'); 
        console.log("menuClose")
    }
    const menu_handle=()=>{
        if(!isMenuOpen){
            document.getElementById('btn-menu').classList.add('active');
            isMenuOpen=true;
            console.log("menupress-open")
            document.getElementById('menuWrapper').classList.add('active');
            document.getElementById('menuBg').classList.add('active');
        }else{            
            document.getElementById('btn-menu').classList.remove('active');
            document.getElementById('menuBg').classList.remove('active');
            menuClose()        
            console.log("menupress-close")
        }
    }
    document.getElementById('btn-menu').addEventListener('click', menu_handle);
    document.addEventListener('minimize',()=>{
        //menuClose()
        if(isMenuOpen){
            triggerNativeEvent(document.getElementById('btn-menu'),'click');
        } 
    });
    ipcRenderer.on('timer:blur', ()=>{
        //menuClose()
        if(isMenuOpen){
            triggerNativeEvent(document.getElementById('btn-menu'),'click');
        } 
    });
    
    document.getElementById('menuBg').addEventListener('click', ()=>{
        if(isMenuOpen){
            triggerNativeEvent(document.getElementById('btn-menu'),'click');
        } 
    });

    soundControl()
}

export {menuInit}