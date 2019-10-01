
import {showPreloader,removePreloader} from './preloader';
import {DoingTimer} from './Doingtimer';
import {buttonInit} from './button';
import {titleContentInit} from './title-content';
import {base_url,type} from './globalVar_html';
import {ipcRendererInit} from './electron';
import {SoundEventDispatch} from './SoundEventDispatch';
import {soundEventHandleInit} from './soundEventHandle';

//const electron = window.require('electron');
//const {ipcRenderer} = electron;

(function ($) {
    showPreloader()

    //htmlloadDone, old script , for when minimize refresh page in devtool, need expand the app
    //ipcRenderer.send('htmlLoadDone');
    //console.log('htmlLoadDone:sent');

    ipcRendererInit();
    //console.log(this.location)       
    $.get( base_url+'/doing_timer/start/'+type, function( data ) {
      $("#doingNote").val(data.title);
      $("#timeMark").val(data.content);
      $("#endTime").val(data.endTime);    
      
      removePreloader();

      const timerControl=new DoingTimer({
        target: document.getElementById("timer"),
        startTime: 0 //1000 = 1s
      });
      const soundEvent = new SoundEventDispatch(document.getElementById("endTime").value);

      titleContentInit();
      soundEventHandleInit(timerControl);
      buttonInit(timerControl,soundEvent);
  
    },"json")

}(jQuery)); //--end (function ($) {