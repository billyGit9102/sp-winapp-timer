const currentTime=()=> {         
    const newDate = new Date();
    let h = newDate.getHours();
    h = h < 10 ? "0" + h : h;
    let m = newDate.getMinutes();
    m = m < 10 ? "0" + m : m;
    const timeString = h + ":" + m;
    return timeString;
}
export { currentTime }