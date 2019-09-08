//const {winW, winH, winW_mini, winH_mini} = require('./globalVars');
const fs = require('fs');
const {loadSize} = require('./browserWindow/saveLoadSize');

const dataSizePath="./data-largeSize.json";

let winW=()=>{
    //console.log(fs.existsSync("./data-largeSize.json"));
    let sizeW;
    if (fs.existsSync("./data-largeSize.json")){ 
        sizeW=loadSize().width        
    }else{
        sizeW=600
    }
    console.log(sizeW);
    return sizeW;
}

let winH=600;
let winW_mini=150;
let winH_mini=60;

function ca(){
    console.log("gca");
}
module.exports = {
    winW, 
    winH,
    winW_mini,
    winH_mini,
    dataSizePath,
    ca
};