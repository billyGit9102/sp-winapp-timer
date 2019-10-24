//const {winW, winH, winW_mini, winH_mini} = require('./globalVars');

//const {loadSize} = require('./browserWindow/saveLoadSize');

const {loadData} = require('./browserWindow/saveLoadData');

let winW=()=>{
    let sizeW;
    sizeW=loadData().width; 
    return sizeW;
}
let winH=()=>{
    let sizeH;
    sizeH=loadData().height;
    return sizeH;
}
let minWinW=()=>{
    let sizeW;
    sizeW=loadData().minWidth; 
    return sizeW;
}
let minWinH=()=>{
    let sizeH;
    sizeH=loadData().minHeight;
    return sizeH;
}
const winW_mini=150;
const winH_mini=60;

module.exports = {
    winW, 
    winH,
    winW_mini,
    winH_mini,
    minWinW,
    minWinH
};