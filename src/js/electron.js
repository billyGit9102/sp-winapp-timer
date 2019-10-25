/* ========================================== *
*  
*  1. handle expand button click event
*  2. response to electron main window event
*  
* ========================================== */
import  { triggerNativeEvent } from './_utility-function/eventTrigger';
const electron = window.require('electron');
const {ipcRenderer} = electron;


/* ---------------------------------------------------- *
*  1. handle expand button click event
* ----------------------------------------------------- */

const ipcRendererInit=(timerControl)=>{
    ipcRenderer.send('htmlLoadDataDone');

    let bodyele=document.getElementsByTagName("body")[0];

    const toggleExpand_handle=(e)=>{
        e.preventDefault();
        //console.log("is_expand",is_expand);
        let is_expand=bodyele.classList.contains("expand");
        if(is_expand){
            bodyele.classList.remove("expand");            
            ipcRenderer.send('timer:expand',false);
            document.dispatchEvent(new CustomEvent("minimize"));
        }else{
            bodyele.classList.add("expand");        
            ipcRenderer.send('timer:expand',true);
        }        
       //console.log("expand btn click");
    } 
    document.getElementById('btn-expander').addEventListener('click', toggleExpand_handle);

    //document.getElementById('curDoing').addEventListener('focus', toggleExpand_handle);

    /* ---------------------------------------------------- *
    *  2. response to electron main window timer:blur event
    * ----------------------------------------------------- */
    ipcRenderer.on('timer:blur', ()=>{
        if(timerControl.status==='stop'){
            triggerNativeEvent(document.getElementById("btn-start"),'click');
        } 
        if(timerControl.status==='pause'){
            triggerNativeEvent(document.getElementById("btn-resume"),'click');
        }
        console.log('timer:blur');
        //bodyele.className="";
        //triggerNativeEvent(document.getElementById("btn-start"),'click');
        bodyele.classList.remove("expand");
    });
    ipcRenderer.on('timer:max', ()=>{
        //console.log('timer:max');
        bodyele.classList.add("max");
        bodyele.classList.add("expand");
    });
    ipcRenderer.on('appStart', ()=>{
        
        //console.log('appStart');
    //bodyele.className="expand";
    
    });
}

export {ipcRendererInit}