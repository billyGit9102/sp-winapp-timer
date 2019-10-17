import {soundProcess,sound1Min,sound2Min,sound5Min} from './sound';
import  { base_url,type } from './globalVar_html.js';
import  { triggerNativeEvent } from './utility-function/eventTrigger';

const soundEventHandleInit=(timerControl)=>{
    document.addEventListener("sound:start", ()=>{
        console.log("sound:start");
        soundProcess.currentTime = 0;
        soundProcess.play();
    });

    document.addEventListener("sound:process", ()=>{
        let formData = new FormData();
        formData.append('ticks', timerControl.getTicks());
        formData.append('endTime', document.getElementById("ipt-endTime").value);
        fetch(base_url+'doing_timer/set_ticks/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(()=>{
            //console.log(response + "set_ticks")
        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });


        console.log("sound:process");
        soundProcess.play();
    });

    document.addEventListener("sound:1min", ()=>{
        console.log("sound:1min");
        sound1Min.play();
    });

    document.addEventListener("sound:2min", ()=>{
        console.log("sound:2min");
        sound2Min.play();
    });

    document.addEventListener("sound:5min", ()=>{
        console.log("sound:5min");
        sound5Min.play();
    });

    document.addEventListener("sound:End", ()=>{
        console.log("sound:End");
        document.getElementsByTagName('body')[0].classList.add('timerAlert');
        triggerNativeEvent(document.getElementById("btn-expander"),'click')
        //console.log("triggerNativeEvent(document.getElementById(expander)");
        
        sound2Min.loop = true;
        sound2Min.play();
    });
    document.addEventListener("sound:stop", ()=>{
        console.log("sound:stop");
        document.getElementsByTagName('body')[0].classList.remove('timerAlert');
        sound2Min.loop = false;
        sound2Min.pause();
        sound2Min.currentTime = 0;
    })
}

export {soundEventHandleInit}