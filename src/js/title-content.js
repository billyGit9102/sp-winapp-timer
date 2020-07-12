import  { base_url,type } from './globalVar_html.js';
import  { triggerNativeEvent } from './_utility-function/eventTrigger';


const titleContentInit=(timerControl)=>{
    const ele_doingNote=document.getElementById("txa-doingNote");
    const update_curDoing=(str)=>{
        document.getElementById("ipt-curDoing").value=str.match(/.*/)[0];
    }
    const update_DoingNote=(str)=>{
        ele_doingNote.value=ele_doingNote.value.replace(/.*/,str);
        triggerNativeEvent(ele_doingNote,'change')	
    }
    update_curDoing(ele_doingNote.value);    
    document.getElementById("ipt-curDoing").addEventListener("change",(e)=>{
        //console.log(e.target.value,'curDoing');
        update_DoingNote(e.target.value);
    });
    document.getElementById("txa-doingNote").addEventListener("change",(e)=>{
        console.log('doingNote change');
        document.getElementById("upload-status").className = "show"
        let title=e.target.value;
        update_curDoing(title);

        let formData = new FormData();
        formData.append('title', title);
        fetch(base_url+'doing_timer/set_title/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            document.getElementById("upload-status").className = "hide"
            return response.text()
        })
        .then(()=>{
            //console.log(response)
        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

    })
    document.getElementById("txa-timeMark").addEventListener("change",(e)=>{
        let content=e.target.value;
        console.log('txa-timeMark change');
        //console.log("content-change="+content)
        document.getElementById("upload-status").className = "show"

        let formData = new FormData();
        formData.append('content', content);
        fetch(base_url+'doing_timer/set_content/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText);
            document.getElementById("upload-status").className = "hide"
            return response.text()
        })
        .then(()=>{
            //console.log(response + "timeMark change")
        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    })

    document.getElementById("ipt-endTime").addEventListener("change", (e)=>{
        //console.log( this,'end time',);
        let v = e.target.value;
        if (v == "") {
            e.target.value=0;
        }

        let formData = new FormData();
        formData.append('ticks', timerControl.getTicks());
        formData.append('endTime', e.target.value);
        fetch(base_url+'doing_timer/set_ticks/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(()=>{
            //console.log(response)
        })
        .catch((error)=>{
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

        timerControl.setEndTime(e.target.value)
    })
}

export {titleContentInit}