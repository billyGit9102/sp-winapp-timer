import {showPreloader,removePreloader} from './preloader';
import {DoingTimer} from './Doingtimer';
import {buttonActionInit} from './button';
import {titleContentInit} from './title-content';
import {base_url,type} from './globalVar_html';
import {ipcRendererInit} from './electron';
import {soundEventHandleInit} from './soundEventHandle';

//const electron = window.require('electron');
//const {ipcRenderer} = electron;

(function () {
    showPreloader()
    ipcRendererInit();
   
    var formData = new FormData();
    formData.append('postPhpDataTest', 'heyday');
    fetch(base_url+'/doing_timer/start/'+type)
    .then(response=>{
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .then(data=>{
      document.getElementById("doingNote").value=data.title;
      document.getElementById("timeMark").value=data.content;
      document.getElementById("endTime").value=data.endTime;
      removePreloader();

      const timerControl=new DoingTimer({
        target: document.getElementById("timer"),
        startTime: 0 //1000 = 1s
      });
      soundEventHandleInit(timerControl);

      titleContentInit();
      buttonActionInit(timerControl);
    })
    .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ', error.message);
    });
}()); //--end (function ($) {