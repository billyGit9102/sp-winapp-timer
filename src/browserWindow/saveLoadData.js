const fs = require('fs');
const dataSizePath="./data-winLargeSize.json";
let size;
const loadData=()=>{
    if (fs.existsSync(dataSizePath)){
        console.log('fileexist');
        let rawdata = fs.readFileSync(dataSizePath);
        size = JSON.parse(rawdata);    
    }else{
        console.log('file not exist');
        size={};
        size.width=600;        
        size.height=600;
    }
    console.log(size);
    return size;
}

module.exports = {
    loadData
}