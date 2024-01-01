
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


//for text-from-right animation on Scroll
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-show');
        }
    });
});

const hideElements = document.querySelectorAll('.aos-hidden');
hideElements.forEach((el)=> observer.observe(el));




// animate number counter
const counterNum = document.querySelectorAll(".stat-cnt-number");
const speed = 500;
function counterFunction(){
    counterNum.forEach((curElem) => {
        const updateNumber = () => {
            const targetNumber = parseInt(curElem.dataset.number);
            // console.log(targetNumber);
            const initialNum = parseInt(curElem.innerText);
            // console.log(initialNum);
            
            const incrementNumber = Math.trunc(targetNumber / speed);
            // console.log(incrementNumber);
            
            if (initialNum < targetNumber) {
                curElem.innerText = `${initialNum + incrementNumber}+`;
                setTimeout(updateNumber, 10);
            }
        };
        updateNumber();
    });
}

const statSection = document.querySelectorAll(".stat-cnt");
const statSelectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            counterFunction();
        }
    });
});
statSection.forEach((el) => statSelectionObserver.observe(el));


//Reveal animation on scroll
const TextAnimationObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('aos-reveal-show');
        }
    });
});

const RevealElements = document.querySelectorAll('.aos-reveal-hidden');
RevealElements.forEach((el)=> TextAnimationObserver.observe(el));
