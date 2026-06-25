let index = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");
let slideTimer;

function changeSlide(nextIndex) {
  // Agar manual click se index aaya hai toh wo use karein, nahi toh current index
  if (typeof nextIndex === 'number') {
    index = nextIndex;
  }

  // Boundary checks (Looping slider)
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  // Saare slides aur dots se active class hatana (Bina display none use kiye)
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (dots[i]) dots[i].classList.remove("active");
  });

  // Sirf current slide aur dot ko active karna
  slides[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");

  // Agle slide ke liye index ready karna
  index++;

  // Timer ko clear karke naya lagana taaki clicks ke waqt glitch na ho
  clearTimeout(slideTimer);
  slideTimer = setTimeout(changeSlide, 5000);
}

// Dots par click karne ke liye setup (Professional UX)
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    changeSlide(i);
  });
});

// Slider ko start karein
changeSlide();
