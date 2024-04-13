
//navbar hidden on page scroll
const navbar = document.querySelector(".header-ctr");
let prevScrollY = window.scrollY;
var twentyViewHeight = 0.2 * window.innerHeight;

window.onscroll = function (){

        if(prevScrollY < window.scrollY){
            //scroll down
            navbar.classList.add("hidden");
            navlist.classList.remove("open");
            menu.classList.remove("open");
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
let menu = document.querySelector("#hamburger");
let navlist = document.querySelector(".navlist");

menu.onclick = function(){
    menu.classList.toggle("open");
    navlist.classList.toggle("open");
};


//for text-from-/right animation on Scroll
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-show');
        }
    });
});

const observerRightTrans = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-right-show');
        }
    });
});

const hideElements = document.querySelectorAll('.aos-hidden');
hideElements.forEach((el)=> observer.observe(el));

const hidenewElements = document.querySelectorAll('.aos-right-hidden');
hidenewElements.forEach((el)=> observerRightTrans.observe(el));




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


//Sliding profile card
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);