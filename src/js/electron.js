/* ========================================== *
*  
*  1. handle expand button click event
*  2. response to electron main window event
*  
* ========================================== */

const electron = window.require('electron');
const {ipcRenderer} = electron;

/* ---------------------------------------------------- *
*  1. handle expand button click event
* ----------------------------------------------------- */

const ipcRendererInit=()=>{
    let bodyele=document.getElementsByTagName("body")[0];
    let is_expand=true;

    function toggleExpand_handle(e){
        e.preventDefault();
        console.log("is_expand",is_expand);
        is_expand=bodyele.classList.contains("expand");
        if(is_expand){
            bodyele.classList.remove("expand");
            //bodyele.className="";
        }else{
            bodyele.classList.add("expand");
            //bodyele.className="expand";
        }
        is_expand=bodyele.classList.contains("expand");
        ipcRenderer.send('timer:expand',is_expand);
        console.log("expand btn click");		
    }
    document.getElementById('expander').addEventListener('click', toggleExpand_handle);

    //document.getElementById('curDoing').addEventListener('focus', toggleExpand_handle);

    /* ---------------------------------------------------- *
    *  2. response to electron main window timer:blur event
    * ----------------------------------------------------- */
    ipcRenderer.on('timer:blur', function(e, item){
        console.log('timer:blur');
        //bodyele.className="";
        bodyele.classList.remove("expand");
    });
    ipcRenderer.on('timer:max', function(e, item){
        console.log('timer:max');
        bodyele.classList.add("max");
        bodyele.classList.add("expand");
    });
    ipcRenderer.on('appStart', function(e){
        console.log('appStart');
    //bodyele.className="expand";
    });
}

export {ipcRendererInit}