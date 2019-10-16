/* ========================================== *
*  
*  1. handle expand button click event
*  2. response to electron main window event
*  
* ========================================== */

const electron = window.require('electron');
const {ipcRenderer} = electron;

import { activeSound} from './sound';

/* ---------------------------------------------------- *
*  1. handle expand button click event
* ----------------------------------------------------- */

const ipcRendererInit=()=>{
    let bodyele=document.getElementsByTagName("body")[0];

    const toggleExpand_handle=(e)=>{
        //activeSound()
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
    document.getElementById('expander').addEventListener('click', toggleExpand_handle);

    //document.getElementById('curDoing').addEventListener('focus', toggleExpand_handle);

    /* ---------------------------------------------------- *
    *  2. response to electron main window timer:blur event
    * ----------------------------------------------------- */
    ipcRenderer.on('timer:blur', ()=>{
        //console.log('timer:blur');
        //bodyele.className="";
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