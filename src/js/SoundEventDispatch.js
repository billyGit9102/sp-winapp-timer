// JavaScript Document
class SoundEventDispatch{
    endTime;
    constructor(endTime){
        this.endTime=endTime*60;
        document.addEventListener("timer:ticksChange",this.handleTicksChange);
        //console.log("soundTimer start",this.endTime);
        //console.log(this.endTime);
    }
    handleTicksChange=(e)=>{
        //console.log("handleTicksChange");
        //console.log(this.endTime)
        
        let x=e.detail.ticks;
        let checkStart=(x/1000)/3==1?true:false;
		let checkProcess=(x/1000)%15==0?true:false;
		let check1Min=(x/1000)%60==0?true:false;
		let check2Min=(x/1000)%120==0?true:false;
		let check5Min=(x/1000)%300==0?true:false;
        let checkEnd=(x/1000)%this.endTime==0?true:false;

        //console.log("endTime="+this.endTime);
        //console.log(this);

        if(checkEnd){
            console.log("SoundTrigger-checkEnd")
            document.dispatchEvent(new CustomEvent("sound:End"));
        }			
        if( (x/1000)%60 == 59){
            console.log("SoundTrigger-59s")
            document.dispatchEvent(new CustomEvent("sound:10s"));
        }        
        if(checkStart){
            console.log("SoundTrigger-checkStart")
            document.dispatchEvent(new CustomEvent("sound:start"));
        }
        if(checkProcess && !check1Min && !check2Min && !check5Min && !checkEnd){
            console.log("SoundTrigger-sound:process")
            document.dispatchEvent(new CustomEvent("sound:process"));
        }
        if(check1Min && !check2Min && !check5Min && !checkEnd){
            console.log("SoundTrigger-1min")
            document.dispatchEvent(new CustomEvent("sound:1min"));
        }			
        if(check2Min && !check5Min && !checkEnd){
            console.log("SoundTrigger-2min")
            document.dispatchEvent(new CustomEvent("sound:2min"));
        }
        if(check5Min && !checkEnd){
            console.log("SoundTrigger-5min")
            document.dispatchEvent(new CustomEvent("sound:5min"));
        }
    }
	setEndTime=(e)=>{ this.endTime=e*60;console.log("set end Time:SoundTrigger", this.endTime) }
} 
export {SoundEventDispatch}