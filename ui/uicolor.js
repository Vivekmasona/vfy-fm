// Thumbnail jo UI me dikh raha hai
const poster = document.getElementById("SThumb"); 
const colorThief = new ColorThief();
const metaTheme = document.querySelector('meta[name="theme-color"]');

function updateThemeFromPoster() {
  if (poster.complete) {
    let color = colorThief.getColor(poster); // dominant color
    let rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    // contrast text color
    let brightness = (color[0]*0.299 + color[1]*0.587 + color[2]*0.114);
    let textColor = brightness > 186 ? "#000" : "#fff";

    // CSS variables update
    document.documentElement.style.setProperty("--theme-bg", rgb);
    document.documentElement.style.setProperty("--theme-text", textColor);

    // Mobile PWA header color
    if (metaTheme) metaTheme.setAttribute("content", rgb);
  }
}

// Jab poster load ya change ho
poster.addEventListener("load", updateThemeFromPoster);

// Agar song change hota hai aur SThumb update hota hai
function onSongChange() {
  updateThemeFromPoster();
}
