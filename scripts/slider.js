const imgTrack = document.querySelector('.img-slider-list');
const imgSlides = Array.from(imgTrack.children);

const txtTrack = document.querySelector('.txt-slider-list');
const txtSlides = Array.from(txtTrack.children);

const dotsNav = document.querySelector('.slider-nav');
const dots = Array.from(dotsNav.children); 



//Changing of Slide
const slideChange = (track, currentSlide, targetSlide) => {

    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

//Updates the carousel indiactor
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('active');
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('active');
    targetDot.classList.add('current-slide');
}



// when click the nav indicator, move to that slide
dotsNav.addEventListener('click', e => {

    //what indicator was clicked on?
    const targetDot = e.target.closest('button');

    if(!targetDot) return;
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetImgSlide = imgSlides[targetIndex];
    const targetTxtSlide = txtSlides[targetIndex];
    const currentImgSlide = imgTrack.querySelector('.current-slide');
    const currentTxtSlide = txtTrack.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');

    slideChange(imgTrack, currentImgSlide, targetImgSlide);
    slideChange(txtTrack, currentTxtSlide, targetTxtSlide)
    updateDots(currentDot, targetDot);
    
})


