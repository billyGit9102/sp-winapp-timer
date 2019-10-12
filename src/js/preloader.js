//only show preloader when load time exsist 100ms, 
//because want to show preloader only when app start
//prevent the loader show when refresh page
const showPreloader=()=>{
    setTimeout(()=>{
        document.getElementById("preloader").classList.add('init');
        //console.log('$("#preloader").fadeIn(20)')
    }, 100);
}

//when ajax load php data finish, remove preloader html
const removePreloader=()=>{
    document.getElementById("preloader").classList.add('fadeout');
    setTimeout(()=>{
        document.getElementById("preloader").classList.remove('init');
        document.getElementById("preloader").classList.remove('fadeout');
        const parent=document.getElementsByTagName('body')[0];
        const child=document.getElementById('preloader');
        parent.removeChild(child);
    },350)
}
export {showPreloader,removePreloader}