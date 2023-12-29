
//navbar hidden on page scroll
const navbar = document.querySelector(".header");
let prevScrollY = window.scrollY;
var twentyViewHeight = 0.2 * window.innerHeight;

window.onscroll = function (){

        if(prevScrollY < window.scrollY){
            //scroll down
            navbar.classList.add("hidden");
        }
        else{
            navbar.classList.remove("hidden");
        }

        if(prevScrollY > twentyViewHeight){
            navbar.classList.add("scroll");
        }else{
            navbar.classList.remove("scroll");
        }
    prevScrollY = window.scrollY;
};



//menu icon
let menu = document.querySelector("#menu-icon");

let navlist = document.querySelector(".navlist");

menu.onclick = function(){
    menu.classList.toggle('bx-x');
    navlist.classList.toggle("open");
};


//for text animation on Scroll
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-show');
        }
    });
});

const hideElements = document.querySelectorAll('.aos-hidden');
hideElements.forEach((el)=> observer.observe(el));

