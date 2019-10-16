import { activeSound } from './sound';
import { currentTime } from './utility-function/currentTime';
import { base_url,type } from './globalVar_html.js';
const buttonActionInit=(timerControl)=>{

    document.getElementById("endTime").addEventListener("change", (e)=>{
        //console.log( this,'end time',);
        let v = e.target.value;
        if (v == "") {
            e.target.value=0;
        }

        let formData = new FormData();
        formData.append('ticks', timerControl.getTicks());
        formData.append('endTime', e.target.value);
        fetch(base_url+'doing_timer/set_ticks/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(()=>{
            //console.log(response)
        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

        timerControl.setEndTime(e.target.value)
    })

    //button action
    let doingStTimer = ">???|-"
    let doingEndTimer = "<|"
    document.getElementById("start").addEventListener("click", ()=>{
        timerControl.startTimer();
        //activeSound();
        //$("#start").addClass("hide");
        document.getElementById("start").className = "hide";
        //$("#pause").addClass("show");
        document.getElementById("pause").className = "show";
        doingStTimer = ">" + currentTime() + "-";
    })
    document.getElementById("pause").addEventListener("click", ()=>{
        timerControl.pauseTimer();
        //$("#pause").addClass("hide");
        document.getElementById("pause").className = "hide";
        //$("#resume").addClass("show");
        document.getElementById("resume").className = "show";
    })
    document.getElementById("resume").addEventListener("click", ()=>{
        timerControl.resumeTimer();
        //$("#resume").addClass("hide");
        document.getElementById("resume").className = "hide";
        //$("#pause").addClass("show");
        document.getElementById("pause").className = "show";
    })

    let press_stop = false;
    document.getElementById("stop").addEventListener("click", ()=>{
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
            //console.log("press stop",ct) // && !press_stop
            if (ct != "0s") {
                press_stop = true;
                //get current time, + cur doing task
                doingEndTimer = "-" + currentTime() + "| " + document.getElementById("curDoing").value  + " \n"; 
                
                //get timemark textare text, change to array
                let currentDoingTxtContent = document.getElementById("timeMark").value;
                currentDoingTxtContent = currentDoingTxtContent.split(" ");
                //console.log("currentDoingTxtContent"+currentDoingTxtContent)

                //add current done time in front
                currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer);
                let output = currentDoingTxtContent
                output = output.join(" ");

                //remove first row space
                output = output.replace(" >", ">");
                document.getElementById("timeMark").value=output;

                //timerControl.pauseTimer()
                timerControl.stopTimer();
                
                document.getElementById("resume").className = "hide";   
                document.getElementById("start").className = "show";
                document.getElementById("pause").className = "hide";
                
                
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
    let content=document.getElementById("timeMark").value;

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