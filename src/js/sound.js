const soundArray = ["sound:process", "sound:1min", "sound:2min", "sound:5min"];
const restartTime = [3, 4, 3, 10];

const soundProcess = document.getElementById("sound:process");
soundProcess.volume = 1;
const sound1Min = document.getElementById("sound:1min");
sound1Min.volume = 0.1;
const sound2Min = document.getElementById("sound:2min");
sound2Min.volume = 0.05;
const sound5Min = document.getElementById("sound:5min");
sound5Min.volume = 1;

const activeSound=()=> {
    for (var i = 0; i < soundArray.length; i++) {
        console.log(soundArray[i]);
        var s = document.getElementById(soundArray[i]);
        s.muted = true;
        s.play();
        console.log(s.volume);
        console.log("activeSound");
        let x = s;
        setTimeout(function() {
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


export { activeSound, soundProcess,sound1Min,sound2Min,sound5Min};