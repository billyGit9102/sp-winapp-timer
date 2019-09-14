const fs = require('fs');
const dataSizePath="./data-winLargeSize.json";

function saveSize(e){
    console.log("window resize");
    console.log(e.sender.getSize());
    let winSize = { 
        width: e.sender.getSize()[0],
        height: e.sender.getSize()[1]
    };
    let data = JSON.stringify(winSize, null, 2);

    fs.writeFile(dataSizePath, data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}
function loadSize(){    
    let size;
    if (fs.existsSync(dataSizePath)){ 
        let rawdata = fs.readFileSync(dataSizePath);
        size = JSON.parse(rawdata);    
    }else{
        size={};
        size.width=600;        
        size.height=600;
    }
    size.width=size.width<200?200:size.width;
    size.height=size.height<350?350:size.height;
    return size;
}

module.exports = {
    saveSize,
    loadSize
}