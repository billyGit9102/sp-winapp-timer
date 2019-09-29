
import {soundHandleInit} from './sound-handler';
import {DoingTimer} from './Doingtimer';
import {buttonInit} from './button';

(function ($) {
    $.get( "http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/start/home", function( data ) {
        $( ".result" ).html( data );
        //console.log(data.endTime );

        $("#doingNote").val(data.title);
        $("#timeMark").val(data.content);
        $("#endTime").val(data.endTime);
      },"json")

    const timerControl=new DoingTimer({
      target: document.getElementById("timer"),
      startTime: 500
    });

    soundHandleInit(timerControl);
    buttonInit(timerControl);

}(jQuery)); //--end (function ($) {