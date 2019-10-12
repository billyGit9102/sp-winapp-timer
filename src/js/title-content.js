import  { base_url,type } from './globalVar_html.js';
import  { triggerNativeEvent } from './utility-function/eventTrigger';

const titleContentInit=()=>{
    let ele_doingNote=document.getElementById("doingNote");
    update_curDoing(ele_doingNote.value);
    
    document.getElementById("curDoing").addEventListener("change",(e)=>{
        console.log(e.target.value,'curDoing');
        update_DoingNote(e.target.value);
    });
    
    function update_DoingNote(str){
        ele_doingNote.value=ele_doingNote.value.replace(/.*/,str);
        //$("#doingNote").trigger("change");
        triggerNativeEvent(document.getElementById("doingNote"),'change')	
    }
    function update_curDoing(str){
        document.getElementById("curDoing").value=str.match(/.*/)[0];
    }

    document.getElementById("doingNote").addEventListener("change",(e)=>{
        var title=e.target.value;
        update_curDoing(title);
        //console.log(title)
        // $.ajax({
        //     url: base_url+'doing_timer/set_title/'+type,
        //     data: {'title':title},
        //     type: "POST",
        //     success:function(response){
        //             console.log("set-title111====================="+response)
        //             }
        // });

        var formData = new FormData();
        formData.append('title', title);
        fetch(base_url+'doing_timer/set_title/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(response=>{
            console.log(response)
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

    })
    document.getElementById("timeMark").addEventListener("change",(e)=>{
        var content=e.target.value;
        console.log("content-change="+content)
        // $.ajax({
        //     url: "http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/set_content/"+window.timerType,
        //     data: {'content':content},
        //     type: "POST",
        //     success:function(response){
        //             console.log(response)
        //             }
        // });

        var formData = new FormData();
        formData.append('content', content);
        fetch(base_url+'doing_timer/set_content/'+type, { method:'POST', body:formData })
        .then(response=>{
            if (!response.ok) throw new Error(response.statusText)
            return response.text()
        })
        .then(response=>{
            console.log(response + "timeMark change")
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });


    })

}

export {titleContentInit}