//extend({}, objA, objB);
const extend =(out, ...args)=> {
    //make first parameter as base object
    out= out || {};    
    //start mix other object
    //loop object
    for (var i = 0; i < args.length; i++) {
        //if no obj, stop script        
        if (!args[i]) continue;
        out = {...out,...args[i]};      
    }
    return out;
};

export {extend}