//const {winW, winH, winW_mini, winH_mini} = require('./globalVars');
const fs = require('fs');
const {loadSize} = require('./browserWindow/saveLoadSize');
const {dataSizePath} = require('./globalVars-path');

let winW=()=>{
    let sizeW;
    if (fs.existsSync(dataSizePath)){ 
        sizeW=loadSize().width        
    }else{
        sizeW=600
    }
    sizeW=sizeW<200?200:sizeW;
    return sizeW;
}

let winH=()=>{
    let sizeH;
    if (fs.existsSync(dataSizePath)){ 
        sizeH=loadSize().height;        
    }else{
        sizeH=600
    }
    sizeH=sizeH<350?350:sizeH;
    return sizeH;
}

let winW_mini=150;
let winH_mini=60;

module.exports = {
    winW, 
    winH,
    winW_mini,
    winH_mini
};