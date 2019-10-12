import  { base_url,type } from './globalVar_html.js';
import  { triggerNativeEvent } from './utility-function/eventTrigger';


const titleContentInit=()=>{
    const ele_doingNote=document.getElementById("doingNote");
    const update_curDoing=(str)=>{
        document.getElementById("curDoing").value=str.match(/.*/)[0];
    }
    const update_DoingNote=(str)=>{
        ele_doingNote.value=ele_doingNote.value.replace(/.*/,str);
        triggerNativeEvent(document.getElementById("doingNote"),'change')	
    }
    update_curDoing(ele_doingNote.value);    
    document.getElementById("curDoing").addEventListener("change",(e)=>{
        //console.log(e.target.value,'curDoing');
        update_DoingNote(e.target.value);
    });
    document.getElementById("doingNote").addEventListener("change",(e)=>{
        //console.log('doingNote change');
        let title=e.target.value;
        update_curDoing(title);

        let formData = new FormData();
        formData.append('title', title);
        fetch(base_url+'doing_timer/set_title/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(response=>{
            //console.log(response)
        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

    })
    document.getElementById("timeMark").addEventListener("change",(e)=>{
        let content=e.target.value;
        //console.log("content-change="+content)

        let formData = new FormData();
        formData.append('content', content);
        fetch(base_url+'doing_timer/set_content/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(response=>{
            //console.log(response + "timeMark change")
        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    })
}

export {titleContentInit}