const triggerNativeEvent=(el,e)=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent(e, true, false);
    el.dispatchEvent(event);
}


export {triggerNativeEvent}