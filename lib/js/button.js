"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonInit = void 0;

var _sound = require("./sound");

var _currentTime = require("./utility-function/currentTime");

var buttonInit = function buttonInit(timerControl) {
  $("#endTime").on("change", function () {
    var v = $(this).val();

    if (v == "") {
      $(this).val(0);
    }

    $.post("<?php echo base_url('doing_timer/set_ticks/') . $type ?>", {
      "ticks": timerControl.getTicks(),
      "endTime": $("#endTime").val()
    }, function (respones) {});
    soundTri.setEndTime($("#endTime").val()); //sound2Min.loop = true;
    //sound2Min.play();
    //alert(v)
  }); //button action

  var doingStTimer = ">???|-";
  var doingEndTimer = "<|";
  $("#start").on("click", function () {
    timerControl.startTimer();
    (0, _sound.activeSound)(); //$("#start").addClass("hide");

    document.getElementById("start").className = "hide"; //$("#pause").addClass("show");

    document.getElementById("pause").className = "show";
    doingStTimer = ">" + (0, _currentTime.currentTime)() + "-";
  });
  $("#pause").on("click", function () {
    timerControl.pauseTimer(); //$("#pause").addClass("hide");

    document.getElementById("pause").className = "hide"; //$("#resume").addClass("show");

    document.getElementById("resume").className = "show";
  });
  $("#resume").on("click", function () {
    timerControl.resumeTimer(); //$("#resume").addClass("hide");

    document.getElementById("resume").className = "hide"; //$("#pause").addClass("show");

    document.getElementById("pause").className = "show";
  });
  var press_stop = false;
  $("#stop").on("click", function () {
    $.post("<?php echo base_url('doing_timer/done/') . $type ?>", {}, function (respones) {
      var ct = timerControl.getCurrentTime();

      if (ct != "0s" && !press_stop) {
        press_stop = true; //get current time, then set to end time
        //$("#time").text()

        doingEndTimer = "-" + (0, _currentTime.currentTime)() + "| " + document.getElementById("curDoing").value + "\n"; //alert($("#time").text());

        var currentDoingTxtContent = $("#timeMark").val();
        currentDoingTxtContent = currentDoingTxtContent.split(" ");
        console.log(currentDoingTxtContent); //var doingTitle=[];
        //doingTitle[0]=currentDoingTxtContent[0];
        //add current done time in front

        currentDoingTxtContent.unshift(doingStTimer + ct + doingEndTimer); //var output=doingTitle.concat(currentDoingTxtContent)

        var output = currentDoingTxtContent; //console.log(output[1]);
        //output[1]=output[1].substring(1);

        output = output.join(" "); //remove first row space

        output = output.replace(" >", ">");
        $("#timeMark").val(output); //$("#timeMark").trigger("change");

        timerControl.pauseTimer();
        done_timer(); //
      }
    }); //$.post("
  });
};

exports.buttonInit = buttonInit;

function done_timer() {
  var content = $("#timeMark").val(); //console.log("content-change="+content)

  $.ajax({
    url: "http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/set_content/" + window.timerType,
    data: {
      'content': content
    },
    type: "POST",
    success: function success(response) {
      setTimeout(function () {
        location.reload();
      }, 50);
    }
  });
} // 
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