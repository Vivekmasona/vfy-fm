
// App ke load hone ke baad ek state push karte hain
window.addEventListener('load', () => {
  history.pushState(null, null, window.location.href);
});

// Popstate event ko handle karte hain
window.addEventListener('popstate', (event) => {
  // App ko minimize karne ka trick (Chrome/Android par kaam karta hai)
  history.pushState(null, null, window.location.href);
  window.history.go(1); // Yahi line minimize effect deti hai
});



// Random color generate function
function getRandomColor() {
  return `rgb(${Math.floor(Math.random()*256)}, 
              ${Math.floor(Math.random()*256)}, 
              ${Math.floor(Math.random()*256)})`;
}

// Gradient lagana
function setRandomGradient() {
  let colors = [];
  for (let i = 0; i < 3; i++) { // 3 random colors
    colors.push(getRandomColor());
  }
  document.getElementById("progress").style.background =
    `linear-gradient(90deg, ${colors.join(", ")})`;
}

// Page load hone par call
window.addEventListener("load", setRandomGradient);



		
    
