
import {soundHandleInit} from './sound-handler';
import {DoingTimer} from './Doingtimer';
import {buttonInit} from './button';
import {titleContentInit} from './title-content';
import {base_url,type} from './globalVar_html.js';
import {ipcRendererInit} from './electron.js';
import {SoundTrigger} from './SoundTrigger.js';
const electron = window.require('electron');
const {ipcRenderer} = electron;

(function ($) {
    ipcRenderer.send('appLoadDone');
    console.log('appLoadDone:sent'); 
           
    $.get( base_url+'/doing_timer/start/'+type, function( data ) {
        $( ".result" ).html( data );
        //console.log(data.endTime );

        $("#doingNote").val(data.title);
        $("#timeMark").val(data.content);
        $("#endTime").val(data.endTime);

        const timerControl=new DoingTimer({
          target: document.getElementById("timer"),
          startTime: 500
        });
        const soundTri = new SoundTrigger(document.getElementById("endTime").value);

        titleContentInit();
        ipcRendererInit();
        soundHandleInit(timerControl);
        buttonInit(timerControl,soundTri);
    
      },"json")

}(jQuery)); //--end (function ($) {