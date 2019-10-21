import { soundProcess,sound1Min,sound2Min,sound5Min, defaultVolume} from './sound';

const volumnSetting={};
const setVolume=()=>{
    //put input volume into each sound volume
    soundProcess.volume=document.getElementById('sc-playsp').value
    sound1Min.volume=document.getElementById('sc-play1m').value
    sound2Min.volume=document.getElementById('sc-play2m').value
    sound5Min.volume=document.getElementById('sc-play5m').value
}
const saveVolume=()=>{
    //save volume to volumnSetting for rest sound
    volumnSetting.soundProcess=soundProcess.volume
    volumnSetting.sound1Min=sound1Min.volume
    volumnSetting.sound2Min=sound2Min.volume
    volumnSetting.sound5Min=sound5Min.volume
}
const resetDefaultVolume=()=>{
    //set default volume to input
    document.getElementById('sc-playsp').value=defaultVolume[0];
    document.getElementById('sc-play1m').value=defaultVolume[1];
    document.getElementById('sc-play2m').value=defaultVolume[2];
    document.getElementById('sc-play5m').value=defaultVolume[3];
}

const soundControl=()=>{
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
        resetDefaultVolume();
        setVolume();
        saveVolume();
    })

    document.getElementById('btn-playsp').addEventListener('click',()=>{
        //console.log('soundProcess.play();')
        //soundProcess.play();
        document.dispatchEvent(new CustomEvent("sound:process"));
    })
    document.getElementById('btn-play1m').addEventListener('click',()=>{
        //sound1Min.play();
        document.dispatchEvent(new CustomEvent("sound:1min"));
    })
    document.getElementById('btn-play2m').addEventListener('click',()=>{
        //sound2Min.play();
        document.dispatchEvent(new CustomEvent("sound:2min"));
    })
    document.getElementById('btn-play5m').addEventListener('click',()=>{
        //sound5Min.play();
        document.dispatchEvent(new CustomEvent("sound:5min"));
    })
}


export {soundControl}