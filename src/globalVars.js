//const {winW, winH, winW_mini, winH_mini} = require('./globalVars');
const fs = require('fs');
//const {loadSize} = require('./saveLoadSize');

//let dataSizePath="./data-largeSize.json"

let winW=600;
// >{
//     //console.log(fs.existsSync(dataSizePath));

//     // if (fs.existsSync(dataSizePath)){       
//     //     return loadSize().width;
//     // }else{
//     //     return 600;
//     // }
//     return 600;
// }
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
    winH_mini,ca
};