//const {loadSize,saveSize} = require('./browserWindow/saveLoadSize');

const fs = require('fs');
const dataSizePath="./data-winLargeSize.json";
const minExpandWidth=200;
const minExpandHeight=350;

let saveSize=(e)=>{
    //console.log("window resize");
    //console.log(e.sender.getSize());
    let winSize = { 
        width: e.getSize()[0],
        height: e.getSize()[1]
    };
    let data = JSON.stringify(winSize, null, 2);

    fs.writeFile(dataSizePath, data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}
let loadSize=()=>{    
    let size;
    if (fs.existsSync(dataSizePath)){ 
        let rawdata = fs.readFileSync(dataSizePath);
        size = JSON.parse(rawdata);    
    }else{
        size={};
        size.width=600;        
        size.height=600;
    }
    size.width=size.width<minExpandWidth?minExpandWidth:size.width;
    size.height=size.height<minExpandHeight?minExpandHeight:size.height;
    return size;
}

module.exports = {
    saveSize,
    loadSize
}