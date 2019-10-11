import  { base_url,type } from './globalVar_html.js';


const titleContentInit=()=>{
    let ele_doingNote=document.getElementById("doingNote");
    update_curDoing(ele_doingNote.value);
    
    function change_curDoing_handler(e){
        console.log(document.getElementById("curDoing").value);
        update_DoingNote(document.getElementById("curDoing").value);
    }
    document.getElementById("curDoing").addEventListener("change",change_curDoing_handler);
    
    function update_DoingNote(str){
        ele_doingNote.value=ele_doingNote.value.replace(/.*/,str);
        $("#doingNote").trigger("change");	
    }
    function update_curDoing(str){
        document.getElementById("curDoing").value=str.match(/.*/)[0];
    }

    document.getElementById("doingNote").addEventListener("change",(e)=>{
        var title=e.target.value;
        update_curDoing(title);
        console.log(title)
        $.ajax({
            url: base_url+'doing_timer/set_title/'+type,
            data: {'title':title},
            type: "POST",
            success:function(response){
                    console.log("set-title="+response)
                    }
        });
    })
    document.getElementById("timeMark").addEventListener("change",(e)=>{
        var content=e.target.value;
        console.log("content-change="+content)
        $.ajax({
            url: "http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/set_content/"+window.timerType,
            data: {'content':content},
            type: "POST",
            success:function(response){
                    console.log(response)
                    }
        });
    })

}

export {titleContentInit}