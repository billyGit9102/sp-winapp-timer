//const {winW, winH, winW_mini, winH_mini} = require('./globalVars');

const {loadSize} = require('./browserWindow/saveLoadSize');
let winW=()=>{
    let sizeW;
    sizeW=loadSize().width; 
    return sizeW;
}
let winH=()=>{
    let sizeH;
    sizeH=loadSize().height;
    return sizeH;
}
let winW_mini=150;
let winH_mini=60;

module.exports = {
    winW, 
    winH,
    winW_mini,
    winH_mini,
};