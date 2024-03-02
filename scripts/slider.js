const imgTrack = document.querySelector(".img-slider-list");
const imgSlides = Array.from(imgTrack.children);

const txtTrack = document.querySelector(".txt-slider-list");
const txtSlides = Array.from(txtTrack.children);

const dotsNav = document.querySelector(".slider-nav");
const dots = Array.from(dotsNav.children);

//Changing of Slide
const slideChange = (track, currentSlide, targetSlide) => {
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

//Updates the carousel indicator
function updateDots(currentDot, targetDot) {
  currentDot.classList.remove("active");
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("active");
  targetDot.classList.add("current-slide");
};

// when click the nav indicator, move to that slide
dotsNav.addEventListener("click", (e) => {
  //what indicator was clicked on?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  var targetImgSlide = imgSlides[targetIndex];
  var targetTxtSlide = txtSlides[targetIndex];
  const currentImgSlide = imgTrack.querySelector(".current-slide");
  const currentTxtSlide = txtTrack.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  i = targetIndex;

  slideChange(imgTrack, currentImgSlide, targetImgSlide);
  slideChange(txtTrack, currentTxtSlide, targetTxtSlide);
  updateDots(currentDot, targetDot);
});


//Autoplay Carousel starts when its in view
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

let intervalId;
let i = 1;
var len = dots.length;

function startIntervalIfVisible() {
    const targetDiv = document.querySelector(".img-slider-list");
    
  if (isInViewport(targetDiv)) {
    // Start your interval here
    if (!intervalId) {
      intervalId = setInterval(function () {

        // Loop through the slides at the end
        if (i === dots.length) {
          i = 0;
        } else {
          // Perform actions with the dot here
              if (i < dots.length) {
                    slideChange(imgTrack, imgSlides[(i+len-1)%len], imgSlides[i]);
                    slideChange(txtTrack, txtSlides[(i+len-1)%len], txtSlides[i]);
                    updateDots(dots[(i+len-1)%len], dots[i]);
                    i++;
          } else {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      }, 2500);
    }
  } else {
    // Stop the interval if it's running
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Check if the element is in viewport when the page loads
startIntervalIfVisible();

// Check if the element is in viewport on scroll
window.addEventListener("scroll", startIntervalIfVisible);

// Check if the element is in viewport on resize
window.addEventListener("resize", startIntervalIfVisible);
