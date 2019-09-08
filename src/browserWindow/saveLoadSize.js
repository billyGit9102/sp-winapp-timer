'use strict';

const fs = require('fs');
const {dataSizePath} = require('../globalVars');

function saveSize(e){
    console.log("window resize");
    console.log(e.sender.getSize());
    let winSize = { 
        width: e.sender.getSize()[0],
        height: e.sender.getSize()[1]
    };    
    let data = JSON.stringify(winSize, null, 2);

    fs.writeFile('data-largeSize.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}
function loadSize(){
    let rawdata = fs.readFileSync(dataSizePath);
    let size = JSON.parse(rawdata);
    return size;
}

module.exports = {
    saveSize,
    loadSize
}