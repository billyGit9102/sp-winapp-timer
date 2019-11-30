
console.log('[sound js]','hi')

const soundArray = ["sound:process", "sound:1min", "sound:2min", "sound:5min", "sound:end"];
const restartTime = [3, 4, 3, 10, 10];
const defaultVolume=[1,0.1,0.05,0.3,1];
const soundProcess = document.getElementById("sound:process");
soundProcess.volume = defaultVolume[0];
const sound1Min = document.getElementById("sound:1min");
sound1Min.volume = defaultVolume[1];
const sound2Min = document.getElementById("sound:2min");
sound2Min.volume = defaultVolume[2];
const sound5Min = document.getElementById("sound:5min");
sound5Min.volume = defaultVolume[3];
console.log('[sound js] sound5Min obj',sound5Min)
const soundEnd = document.getElementById("sound:end");
console.log('[sound js] soundEnd obj',soundEnd)
soundEnd.volume = defaultVolume[4];

const activeSound=()=> {
    for (let i = 0; i < soundArray.length; i++) {
        //console.log(soundArray[i]);
        let s = document.getElementById(soundArray[i]);
        s.muted = true;
        s.play();
        //console.log(s.volume);
        //console.log("activeSound");
        let x = s;
        setTimeout(()=>{
            x.muted = false
        }, restartTime[i] * 1000)
    }
}
//response for sound trigger
// const muteAllSound=()=>{
//      soundProcess.muted = true;
//      sound1Min.muted = true;
//      sound2Min.muted = true;
//      sound5Min.muted = true;
// }
// const restartAllSound=()=> {
//      soundProcess.muted = false;
//      sound1Min.muted = false;
//      sound2Min.muted = false;
//      sound5Min.muted = false;
// }


export { activeSound, defaultVolume, soundProcess,sound1Min,sound2Min,sound5Min,soundEnd};