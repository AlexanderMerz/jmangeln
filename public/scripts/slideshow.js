const slides = Array.from(document.querySelectorAll('.slide'));
const numberOfSlides = slides.length;
const dotContainer = document.querySelector('.dots');
for (let i = 0; i < numberOfSlides; i++) {
    dotContainer.innerHTML += `
        <div data-id="${i+1}" class="dot ${i === 0 ? 'current' : ''}"></div>
    `;
}
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('button#prev');
const next = document.querySelector('button#next');
const auto = true;
const intervalTime = 5000;
let slideInterval;

function nextSlide () {
    const currentSlide = document.querySelector('.slide.current');
    const currentDot = document.querySelector('.dot.current');
    currentSlide.classList.remove('current');
    currentDot.classList.remove('current');
    if (currentSlide.nextElementSibling) {
        currentSlide.nextElementSibling.classList.add('current');
        currentDot.nextElementSibling.classList.add('current');
    } else {
        slides[0].classList.add('current');
        dots[0].classList.add('current');
    }
}

function prevSlide () {
    const currentSlide = document.querySelector('.slide.current');
    const currentDot = document.querySelector('.dot.current');
    currentSlide.classList.remove('current');
    currentDot.classList.remove('current');
    if (currentSlide.previousElementSibling) {
        currentSlide.previousElementSibling.classList.add('current');
        currentDot.previousElementSibling.classList.add('current');
    } else {
        slides[slides.length - 1].classList.add('current');
        dots[dots.length - 1].classList.add('current');
    }
}

for (const dot of dots) {
    dot.addEventListener('click', function () {
        const currentSlide = document.querySelector('.slide.current');
        const currentDot = document.querySelector('.dot.current');
        currentSlide.classList.remove('current');
        currentDot.classList.remove('current');
        slides[this.dataset.id - 1].classList.add('current');
        this.classList.add('current');
        if (auto) {
            clearInterval(slideInterval);
            startInterval();
        }
    });
}

function startInterval () {
    slideInterval = setInterval(nextSlide, intervalTime);
}

if (auto) {
startInterval(); 
}
