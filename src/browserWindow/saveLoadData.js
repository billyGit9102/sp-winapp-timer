const fs = require('fs');
const dataSizePath="./data-winLargeSize.json";

let data={};
data.width=600;        
data.height=600;
data.minWidth=150;        
data.minHeight=60;

const loadData=()=>{
    let output={...data};

    if (fs.existsSync(dataSizePath)){
        console.log('file exist');
        let rawdata = fs.readFileSync(dataSizePath);
        let loadedData = JSON.parse(rawdata);
        output = {...data,...loadedData}; 
    }else{
        console.log('file not exist');
    }
    console.log(output);    
    return output;
}

module.exports = {
    loadData
}