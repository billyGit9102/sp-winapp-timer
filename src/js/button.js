import { activeSound } from './sound';
import { currentTime } from './utility-function/currentTime';
import { base_url,type } from './globalVar_html.js';
const buttonActionInit=(timerControl)=>{

    document.getElementById("endTime").addEventListener("change", (e)=>{
        console.log( this,'end time press11',);
        var v = e.target.value;
        if (v == "") {
            e.target.value=0;
        }
        $.post(base_url+'doing_timer/set_ticks/'+type, {
            "ticks": timerControl.getTicks(),
            "endTime": e.target.value
        }, function(respones) {})
        timerControl.setEndTime(e.target.value)
    })

    //button action
    var doingStTimer = ">???|-"
    var doingEndTimer = "<|"
    document.getElementById("start").addEventListener("click", ()=>{
        timerControl.startTimer();
        activeSound();
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

    var press_stop = false;
    document.getElementById("stop").addEventListener("click", ()=>{
        $.post(base_url+'doing_timer/done/'+type, {}, (respones)=>{
            var ct = timerControl.getCurrentTime();
            if (ct != "0s" && !press_stop) {
                //let curDoingTask=prompt("type task name");
                press_stop = true;
                //get current time, then set to end time
                //$("#time").text()
                doingEndTimer = "-" + currentTime() + "| " + document.getElementById("curDoing").value  + " \n"; //+ ' ' + curDoingTask
                //alert($("#time").text());
                var currentDoingTxtContent = document.getElementById("timeMark").value;
                currentDoingTxtContent = currentDoingTxtContent.split(" ");
                console.log(currentDoingTxtContent)
                //var doingTitle=[];
                //doingTitle[0]=currentDoingTxtContent[0];
                //add current done time in front
                currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer);
                //var output=doingTitle.concat(currentDoingTxtContent)
                var output = currentDoingTxtContent
                //console.log(output[1]);
                //output[1]=output[1].substring(1);
                output = output.join(" ");
                //remove first row space
                output = output.replace(" >", ">");
                document.getElementById("timeMark").value=output;
                //$("#timeMark").trigger("change");
                timerControl.pauseTimer()
                done_timer();
                //
            }
        }) //$.post("
    })

}
function done_timer(){
    let content=document.getElementById("timeMark").value;

    //console.log("content-change="+content)
    $.ajax({
        url: base_url+"doing_timer/set_content/"+type,
        data: {'content':content},
        type: "POST",
        success:(response)=>{
            setTimeout(()=>{ location.reload(); }, 50);
        }
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