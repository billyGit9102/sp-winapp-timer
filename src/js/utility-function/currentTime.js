const currentTime=()=> {         
    var newDate = new Date();
    var h = newDate.getHours();
    h = h < 10 ? "0" + h : h;
    var m = newDate.getMinutes();
    m = m < 10 ? "0" + m : m;
    var timeString = h + ":" + m;
    return timeString;
}
export { currentTime }