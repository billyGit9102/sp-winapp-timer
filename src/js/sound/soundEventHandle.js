import {soundProcess,sound1Min,sound2Min,sound5Min,soundEnd} from './sound';
import { base_url,type } from '../globalVar_html.js';
import { triggerNativeEvent } from '../_utility-function/eventTrigger';

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
        soundProcess.currentTime = 0;
        soundProcess.play();
    });

    document.addEventListener("sound:1min", ()=>{
        console.log("sound:1min");
        sound1Min.currentTime = 0;
        sound1Min.play();
    });

    document.addEventListener("sound:2min", ()=>{
        console.log("sound:2min");
        sound2Min.currentTime = 0;
        sound2Min.play();
    });

    document.addEventListener("sound:5min", ()=>{
        console.log("sound:5min");
        sound5Min.currentTime = 0;
        sound5Min.play();
    });

    document.addEventListener("sound:End", ()=>{
        console.log("sound:End");
        document.getElementsByTagName('body')[0].classList.add('timerAlert');
        triggerNativeEvent(document.getElementById("btn-expander"),'click')
        //console.log("triggerNativeEvent(document.getElementById(expander)");
        
        soundEnd.loop = true;
        soundEnd.play();
    });
    document.addEventListener("sound:stop", ()=>{
        console.log("sound:stop");
        document.getElementsByTagName('body')[0].classList.remove('timerAlert');
        soundEnd.loop = false;
        soundEnd.pause();
        soundEnd.currentTime = 0;
    })
}

export {soundEventHandleInit}