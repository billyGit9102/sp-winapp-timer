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
        $.post(base_url+'doing_timer/set_ticks/'+type, {
            "ticks": timerControl.getTicks(),
            "endTime": document.getElementById("endTime").value
        },
        function(respones) {
            console.log(respones + "set_ticks");
        })
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
        //$("body").addClass("timerAlert");
        //$("#expander").trigger('click');
        triggerNativeEvent(document.getElementById("expander"),'click')
        console.log("triggerNativeEvent(document.getElementById(expander)");
        
        sound2Min.loop = true;
        sound2Min.play();
    });
}

export {soundEventHandleInit}