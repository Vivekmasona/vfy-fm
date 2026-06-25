let index = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");
let slideTimer;

// Hamaare 3 unique professional animation styles
const animationStyles = ["style-cinematic", "style-blur", "style-slide"];

function changeSlide(nextIndex) {
  if (typeof nextIndex === 'number') {
    index = nextIndex;
  }

  // Boundary check loop ke liye
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  // Har bar ek bilkul naya random animation style chunna (0, 1, ya 2)
  const randomStyle = animationStyles[Math.floor(Math.random() * animationStyles.length)];

  slides.forEach((slide, i) => {
    // Purani saari animation classes ko saaf karna taaki glitch na ho
    slide.className = "slides"; 
    if (dots[i]) dots[i].classList.remove("active");
  });

  // Current slide par 'active' status aur ek random transition style ek saath dena
  slides[index].classList.add("active", randomStyle);
  if (dots[index]) dots[index].classList.add("active");

  index++;

  // Timer reset (agar koi dot click kare toh animation timer shuru se chalega)
  clearTimeout(slideTimer);
  slideTimer = setTimeout(changeSlide, 5000);
}

// Dots click functionality
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => changeSlide(i));
});

// Slider Engine Start!
changeSlide();
