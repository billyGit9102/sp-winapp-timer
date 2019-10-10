import { activeSound } from './sound';
import { currentTime } from './utility-function/currentTime';
import { base_url,type } from './globalVar_html.js';
const buttonActionInit=(timerControl)=>{
    document.getElementById("endTime").addEventListener("change", function() {
        console.log('end time press',this.value)
        var v = this.value;
        if (v == "") {
            this.value=0;
        }
        $.post(base_url+'doing_timer/set_ticks/'+type, {
            "ticks": timerControl.getTicks(),
            "endTime": this.value
        }, function(respones) {})
        
        timerControl.setEndTime(this.value)
        //sound2Min.loop = true;
        //sound2Min.play();
        //alert(v)
    })
    //button action
    var doingStTimer = ">???|-"
    var doingEndTimer = "<|"
    document.getElementById("start").addEventListener("click", function() {
        timerControl.startTimer()
        activeSound()
        //$("#start").addClass("hide");
        document.getElementById("start").className = "hide";
        //$("#pause").addClass("show");
        document.getElementById("pause").className = "show";
        doingStTimer = ">" + currentTime() + "-";
    })
    document.getElementById("pause").addEventListener("click", function() {
        timerControl.pauseTimer();
        //$("#pause").addClass("hide");
        document.getElementById("pause").className = "hide";
        //$("#resume").addClass("show");
        document.getElementById("resume").className = "show";
    })
    document.getElementById("resume").addEventListener("click", function() {
        timerControl.resumeTimer();
        //$("#resume").addClass("hide");
        document.getElementById("resume").className = "hide";
        //$("#pause").addClass("show");
        document.getElementById("pause").className = "show";
    })

    var press_stop = false;
    document.getElementById("stop").addEventListener("click", function() {
        $.post(base_url+'doing_timer/done/'+type, {}, function(respones) {
            var ct = timerControl.getCurrentTime();
            if (ct != "0s" && !press_stop) {
                //let curDoingTask=prompt("type task name");
                press_stop = true;
                //get current time, then set to end time
                //$("#time").text()
                doingEndTimer = "-" + currentTime() + "| " + document.getElementById("curDoing").value  + " \n"; //+ ' ' + curDoingTask
                //alert($("#time").text());
                var currentDoingTxtContent = $("#timeMark").val();
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
                $("#timeMark").val(output);
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
        success:function(response){
            setTimeout(function(){ location.reload(); }, 50);
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