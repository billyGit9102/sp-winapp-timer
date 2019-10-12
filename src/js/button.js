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
        // $.post(base_url+'doing_timer/set_ticks/'+type, {
        //     "ticks": timerControl.getTicks(),
        //     "endTime": e.target.value
        // }, function(respones) {})

        var formData = new FormData();
        formData.append('ticks', timerControl.getTicks());
        formData.append('endTime', e.target.value);
        fetch(base_url+'doing_timer/set_ticks/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(response=>{
            console.log(response)
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

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
        
        // $.post(base_url+'doing_timer/done/'+type, {}, (respones)=>{
        //     var ct = timerControl.getCurrentTime();
        //     console.log("press stop",ct)
        //     if (ct != "0s" && !press_stop) {
        //         press_stop = true;
        //         //get current time, + cur doing task
        //         doingEndTimer = "-" + currentTime() + "| " + document.getElementById("curDoing").value  + " \n"; 
                
        //         //get timemark textare text, change to array
        //         var currentDoingTxtContent = document.getElementById("timeMark").value;
        //         currentDoingTxtContent = currentDoingTxtContent.split(" ");
        //         console.log("currentDoingTxtContent"+currentDoingTxtContent)

        //         //add current done time in front
        //         currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer);
        //         var output = currentDoingTxtContent
        //         output = output.join(" ");

        //         //remove first row space
        //         output = output.replace(" >", ">");
        //         document.getElementById("timeMark").value=output;

        //         timerControl.pauseTimer()
        //         done_timer();
        //     }

        // }) //$.post("


        let formData = new FormData();
        formData.append('no var', "");
        fetch(base_url+'doing_timer/done/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(response=>{
            console.log(response);

            var ct = timerControl.getCurrentTime();
            console.log("press stop",ct)
            if (ct != "0s" && !press_stop) {
                press_stop = true;
                //get current time, + cur doing task
                doingEndTimer = "-" + currentTime() + "| " + document.getElementById("curDoing").value  + " \n"; 
                
                //get timemark textare text, change to array
                var currentDoingTxtContent = document.getElementById("timeMark").value;
                currentDoingTxtContent = currentDoingTxtContent.split(" ");
                console.log("currentDoingTxtContent"+currentDoingTxtContent)

                //add current done time in front
                currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer);
                var output = currentDoingTxtContent
                output = output.join(" ");

                //remove first row space
                output = output.replace(" >", ">");
                document.getElementById("timeMark").value=output;

                timerControl.pauseTimer()

                console.log("put");
                //done_timer();
            }

        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });


    })

}
function done_timer(){
    let content=document.getElementById("timeMark").value;

    //console.log("content-change="+content)
    // $.ajax({
    //     url: base_url+"doing_timer/set_content/"+type,
    //     data: {'content':content},
    //     type: "POST",
    //     success:(response)=>{
    //         setTimeout(()=>{ 
    //             location.reload(); 
    //         }, 50);
    //     }
    // });

    var formData = new FormData();
    formData.append('content', content);
    fetch(base_url+"doing_timer/set_content/"+type, {
        method: 'POST', 
        body: formData
    })
    .then(response=>{
        if (!response.ok) throw new Error(response.statusText)
        return response.text()
    })
	.then(response=>{
        console.log(response)
        setTimeout(()=>{ 
            location.reload(); 
        }, 50);
	})
	.catch(function(error) {
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