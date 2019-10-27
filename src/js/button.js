import { activeSound } from './sound/sound';
import { currentTime } from './_utility-function/currentTime';
import { base_url,type } from './globalVar_html.js';

const electron = window.require('electron');
const {ipcRenderer} = electron;

let soundIsActive=false;


const buttonActionInit=(timerControl)=>{
   

    //button action
    let doingStTimer = ">???|-"
    let doingEndTimer = "<|"
    document.getElementById("btn-start").addEventListener("click", ()=>{
        if(!soundIsActive){
            activeSound();
            soundIsActive=true        
        }        
        timerControl.startTimer();
        document.getElementById("btn-start").className = "hide";
        document.getElementById("btn-pause").className = "show";
        doingStTimer = ">" + currentTime() + "-";
    })
    document.getElementById("btn-pause").addEventListener("click", ()=>{
        timerControl.pauseTimer();
        document.getElementById("btn-pause").className = "hide";
        document.getElementById("btn-resume").className = "show";
    })
    document.getElementById("btn-resume").addEventListener("click", ()=>{
        timerControl.resumeTimer();
        document.getElementById("btn-resume").className = "hide";
        document.getElementById("btn-pause").className = "show";
    })

    document.getElementById("btn-stop").addEventListener("click", ()=>{
        let formData = new FormData();
        formData.append('no var', "");
        fetch(base_url+'doing_timer/done/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(()=>{
            //console.log(response);

            let ct = timerControl.getCurrentTime();
            if (ct != "0s") {
                //get current time, + cur doing task
                doingEndTimer = "-" + currentTime() + "| " + document.getElementById("ipt-curDoing").value  + " \n"; 
                
                //get timemark textare text, change to array
                let currentDoingTxtContent = document.getElementById("txa-timeMark").value;
                currentDoingTxtContent = currentDoingTxtContent.split(" ");
                //console.log("currentDoingTxtContent"+currentDoingTxtContent)

                //add current done time in front
                currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer);
                let output = currentDoingTxtContent
                output = output.join(" ");

                //remove first row space
                output = output.replace(" >", ">");
                document.getElementById("txa-timeMark").value=output;

                //timerControl.pauseTimer()
                timerControl.stopTimer();
                
                document.getElementById("btn-resume").className = "hide";   
                document.getElementById("btn-start").className = "show";
                document.getElementById("btn-pause").className = "hide";
                
                //console.log("done");
                done_timer();
            }

        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    })
}
const done_timer=()=>{
    let content=document.getElementById("txa-timeMark").value;

    let formData = new FormData();
    formData.append('content', content);
    fetch(base_url+"doing_timer/set_content/"+type, {
        method: 'POST', 
        body: formData
    })
    .then(response=>{
        if (!response.ok) throw new Error(response.statusText)
        return response.text()
    })
	.then(()=>{
        //console.log(response)
        setTimeout(()=>{ 
            //location.reload(); 
        }, 50);
	})
	.catch((error)=>{
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
}

export {buttonActionInit}
// 
// var flag = 0;
// $("#refresh").on("click", function() {
//     if ($(this).hasClass("active")) {
//         location.href = "index2.php";
//     } else {
//         location.href = "?refresh=1";
//     }
// });
// $("#muteSound").on("click", function() {
//     if (flag == 0)
//     {
//         $(this).addClass("active")
//         $("#muteSound").text("Restart sound");
//         flag = 1;
//         muteAllSound()
//         return;
//     }
//     if (flag == 1)
//     {
//         $(this).removeClass("active")
//         $("#muteSound").text("Mute sound");
//         flag = 0;
//         restartAllSound()
//         return;
//     }
// });