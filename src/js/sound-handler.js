import {soundProcess,sound1Min,sound2Min,sound5Min} from './sound';
import  { base_url,type } from './globalVar_html.js';

const soundHandleInit=(timerControl)=>{
    $(document).on("sound:start", function() {
        console.log("sound:start");
        soundProcess.currentTime = 0;
        soundProcess.play();
    });

    $(document).on("sound:process", function() {
        $.post(base_url+'doing_timer/set_ticks/'+type, {
            "ticks": timerControl.getTicks(),
            "endTime": $("#endTime").val()
        },
        function(respones) {
            console.log(respones + "set_ticks");
        })
        console.log("sound:process");
        soundProcess.play();
    });

    $(document).on("sound:1min", function() {
        console.log("sound:1min");
        sound1Min.play();
    });

    $(document).on("sound:2min", function() {
        console.log("sound:2min");
        sound2Min.play();
    });

    $(document).on("sound:5min", function() {
        console.log("sound:5min");
        sound5Min.play();
    });

    $(document).on("sound:End", function() {
        console.log("sound:End");
        $("body").addClass("timerAlert")
        sound2Min.loop = true;
        sound2Min.play();
    });
}

export {soundHandleInit}