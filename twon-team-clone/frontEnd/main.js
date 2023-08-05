
// var sliderHolder = $("#slider-holder");
// var slider = $("#slider");
// var slide = $(".slide");
// var slidesLength = slide.length;

// var slideWidth = sliderHolder.width();
// var activeSlide = 0;

// TweenMax.set(slide, { width: slideWidth });
// TweenMax.set(slider, { width: slideWidth * slidesLength });

// $(window).on("load resize", function() {
//     slideWidth = sliderHolder.width();
//     console.log(activeSlide * slideWidth);
//     TweenMax.set(slider, {
//     width: slideWidth * slidesLength,
//     x: activeSlide * slideWidth
//     });
//     TweenMax.set(".slide", { width: slideWidth });
// });

// Draggable.create(slider, {
//     type: "x",
//     bounds: sliderHolder,
//     throwProps: true,
//     snap: snapX
// });

// function snapX(value) {
//   var snapValue = Math.round(value / slideWidth) * slideWidth;
//     activeSlide = snapValue / slideWidth;
//     console.log(activeSlide);
//     return snapValue;
// }
function closeInoBar(){
    document.getElementById("infobar").style.display="none";
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(1000, 5000)
console.log(rndInt)

setInterval(
    function(){
        document.getElementById("loader").style.opacity="0";
        document.getElementById("loader").style.zIndex="-10";
    },rndInt);


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
showDivs(slideIndex += n);
}

function currentDiv(n) {
showDivs(slideIndex = n);
}

function showDivs(n) {
var i;
var x = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("demo");
if (n > x.length) {slideIndex = 1}
if (n < 1) {slideIndex = x.length}
for (i = 0; i < x.length; i++) {
x[i].style.display = "none";  
}
for (i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" ahmed-white", "");
}
x[slideIndex-1].style.display = "block";  
dots[slideIndex-1].className += " ahmed-white";
}




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


$('#productone').hover(
    function(){ $(this).addClass('showimg1') },
    function(){ $(this).removeClass('showimg2') }
)

$('#productone').hover(
    function(){$(this).toggleClass('showimg1');}
    );



function addToFav(){
    console.log("FAVED")
}



