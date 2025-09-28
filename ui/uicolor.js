const poster = document.getElementById("SThumb"); // UI poster
  const metaTheme = document.getElementById("themeColorMeta"); // PWA header
  const colorThief = new ColorThief();
  const audio = document.getElementById("audio"); // aapke audio element

  // CSS variables update function
  function updateThemeFromPoster() {
    if (!poster.complete) return; // wait if image not loaded

    let color = colorThief.getColor(poster); // dominant color
    let rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    // contrast text color
    let brightness = (color[0]*0.299 + color[1]*0.587 + color[2]*0.114);
    let textColor = brightness > 186 ? "#000" : "#fff";

    // Update CSS variables
    document.documentElement.style.setProperty("--theme-bg", rgb);
    document.documentElement.style.setProperty("--theme-text", textColor);

    // Update PWA header
    if (metaTheme) metaTheme.setAttribute("content", rgb);
  }

  // Trigger when poster loads initially
  poster.addEventListener("load", updateThemeFromPoster);

  // Function to change song and poster
  function onSongChange(newThumbnail, newAudio) {
    // Update poster
    poster.src = newThumbnail;

    // Update audio
    if(newAudio){
      audio.src = newAudio;
      audio.play();
    }

    // Wait for new image load then update theme
    poster.addEventListener("load", updateThemeFromPoster, { once: true });
  }

  // Example: Playlist click (assuming song items have data attributes)
  const songItems = document.querySelectorAll(".song-item");

  songItems.forEach(item => {
    item.addEventListener("click", () => {
      const newThumbnail = item.dataset.thumbnail;
      const newAudio = item.dataset.audio;
      onSongChange(newThumbnail, newAudio);
    });
  });

  // Example: Next/Prev buttons
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");

  nextButton.addEventListener("click", () => {
    const nextSong = getNextSong(); // aapka function to get next song data
    onSongChange(nextSong.thumbnail, nextSong.audio);
  });

  prevButton.addEventListener("click", () => {
    const prevSong = getPrevSong(); // aapka function to get previous song data
    onSongChange(prevSong.thumbnail, prevSong.audio);
  });

  // Optional: Autoplay next when current song ends
  audio.addEventListener("ended", () => {
    const nextSong = getNextSong();
    onSongChange(nextSong.thumbnail, nextSong.audio);
  });
