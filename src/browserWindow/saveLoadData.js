const fs = require('fs');
const dataSizePath="./data-winLargeSize.json";

let data={};
data.width=600;        
data.height=600;
data.minWidth=150;        
data.minHeight=60;

const saveData=(sdata)=>{
    let loadedData=loadData();
    let output={};
    output = {...loadedData,...sdata}; 
    let data = JSON.stringify(output, null, 2);
    console.log('saveData')
    console.log(data);
    fs.writeFile(dataSizePath, data, (err) => {
        if (err) throw err;
        console.log('Data written to file',data,'<==written');
    });
}
const loadData=()=>{
    let output={...data};

    if (fs.existsSync(dataSizePath)){
        let rawdata;
        console.log('file exist');
        try{
            rawdata = fs.readFileSync(dataSizePath, "utf8");
            let loadedData = JSON.parse(rawdata);
            output = {...data,...loadedData}; 
        }catch{
            
            console.log('not json==='+rawdata ,'<==raw');
        }
    }else{
        console.log('file not exist');
    }
    console.log(output);    
    return output;
}
const fileData=()=>{
    //cost fileData;
}
module.exports = {
    loadData,saveData
}