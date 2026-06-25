let index = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");
let slideTimer;

function changeSlide(nextIndex) {
  // Agar user ne niche kisi dot par click kiya ho
  if (typeof nextIndex === 'number') {
    index = nextIndex;
  }

  // Loop limits
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  // Saare slides ko chhupana aur dots se active hatana
  slides.forEach((slide, i) => {
    slide.style.display = "none";
    if (dots[i]) dots[i].classList.remove("active");
  });

  // Sirf current slide ko show karna aur dot active karna
  slides[index].style.display = "block";
  if (dots[index]) dots[index].classList.add("active");

  // Agle slide ka index update
  index++;

  // Timer reset taaki clicks par glitch na ho
  clearTimeout(slideTimer);
  slideTimer = setTimeout(changeSlide, 5000);
}

// Dots clicking handler (Professional apps ki tarah)
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => changeSlide(i));
});

// Start Slider
changeSlide();

