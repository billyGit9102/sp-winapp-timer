import {extend} from './utility-function/extend'
class DoingTimer{
	setting;
	ms;
	target;
	endTime;
	intervalTimer;
	currentTime;
	constructor(option){	
		this.setting=extend({target:{name:"default"},"startTime":0,"endTime":0}, option||{});
		this.target=this.setting.target;
		this.ms=this.setting.startTime;
		this.endTime=this.setting.endTime*60;
        this.intervalTimer=""; 
        console.log("DoingTimer-start");
        console.log(this.setting);
        console.log(this.ms,"===tart-dt");
	}	
	_findMilesecond=(x)=>{
		/*
		1000 = 1s 
		remain is the value
		# eg1
		ms = 100/100 = 1
		1ms
		# eg2
		ns = 2500/100 = 25, exceed 10 is not correct, so add a %10
		25%10=5
		5ms
		*/
		let result;
		result=Math.round(x/100)%10;
		return result;
	}
	_findSecond=(x)=>{
		/*
		first, you need to know what value u want
		# find second		
		1000/1000 = 1
		2000/1000 = 2
		20000/1000 = 20
		90000/1000 = 90 <-- exceed 60 should not count, 
		so %60. the value should be 30 

		(x/1000) get second
		%60, adjust to correct value
		*/
		let result;
		result=(x/1000)%60;
		result=String(result).split(".")[0];
		return result;
	}
	_findMinute=(x)=>{
		/*
		(x/1000/60) get min
		exceed 60 min is hour, so %60 , adjust to correct value
		*/
		let result;
		result=(x/1000/60)%60;
		result=String(result).split(".")[0];
		return result;
	}
	_findHour=(x)=>{
		let result;
		result=(x/1000/60/60);
		result=String(result).split(".")[0];
		return result;
	}
	_counter=()=>{			
		this.ms+=100;
		//console.log(this);
		this._displayTime();
		this._dispatchTicksEvent();
	}
	_dispatchTicksEvent=()=>{
		document.dispatchEvent(new CustomEvent("timer:ticksChange",{ detail: {"ticks": this.ms} }));
		//console.log("dispatchEvent - timer:ticksChange");
	}
	_displayTime=()=>{
		let result;
		result="";

		let h=this._findHour(this.ms);
		let m=this._findMinute(this.ms);
		let s=this._findSecond(this.ms);
		//let ss=this._findMilesecond(this.ms);

		result+=h>0?h+"h":"";
		result+=m>0?m+"m":"";
		result+=s>0?s+"s":"0s";			
		//result+=ss>0?ss+"":ss+"";

		this.currentTime=result;

		if(result=="0s0"){
			result="Timer"
		}
		//console.log("_displayTime")
		//console.log(this.endTime)
		
        //document.getElementById("timer").innerHTML=result;
        //console.log(this.target);
		this.target.innerHTML=result;			
	}
	startTimer=()=>{
		this.intervalTimer=setInterval(this._counter,100);
		console.log("startTimer()221")
	}
	pauseTimer=()=>{ clearInterval(this.intervalTimer) }
	resumeTimer=()=>{ this.intervalTimer=setInterval(this._counter,100)}	
	//setEndTime=(e)=>{ this.endTime=e*60; console.log("set end Time:doingtimer", this.endTime)}
	getTicks=()=>{ return this.ms; }
	getCurrentTime=()=>{ return this.currentTime; }
	addTime=(second)=>{ this.ms=this.ms+(second*60000); this._displayTime(); }

}
//let ele=document.getElementById("timer");

export {DoingTimer}