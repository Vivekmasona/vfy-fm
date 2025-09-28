const poster = document.getElementById("SThumb"); // UI poster
  const audio = document.getElementById("SAudio"); // audio element
  const metaTheme = document.getElementById("themeColorMeta"); // PWA header
  const colorThief = new ColorThief();

  // Function to update CSS variables & meta color
  function updateThemeFromPoster() {
    if (!poster.complete) return;

    const color = colorThief.getColor(poster); // dominant color
    const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    // contrast text color
    const brightness = (color[0]*0.299 + color[1]*0.587 + color[2]*0.114);
    const textColor = brightness > 186 ? "#000" : "#fff";

    // Update CSS variables
    document.documentElement.style.setProperty("--theme-bg", rgb);
    document.documentElement.style.setProperty("--theme-text", textColor);

    // Update PWA header
    if (metaTheme) metaTheme.setAttribute("content", rgb);
  }

  // Trigger on poster load
  poster.addEventListener("load", updateThemeFromPoster);

  // Function to change song + poster
  function onSongChange(newThumbnail, newAudio) {
    // Update poster
    poster.src = newThumbnail;

    // Update audio
    if (newAudio) {
      audio.src = newAudio;
      audio.play();
    }

    // Wait for new image load then update theme
    poster.addEventListener("load", updateThemeFromPoster, { once: true });
  }

  // Playlist click example
  const songItems = document.querySelectorAll(".song-item");
  songItems.forEach(item => {
    item.addEventListener("click", () => {
      const newThumbnail = item.dataset.thumbnail;
      const newAudio = item.dataset.audio;
      onSongChange(newThumbnail, newAudio);
    });
  });

  // Next/Prev buttons
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");

  nextButton.addEventListener("click", () => {
    const nextSong = getNextSong(); // return {audio, thumbnail}
    onSongChange(nextSong.thumbnail, nextSong.audio);
  });

  prevButton.addEventListener("click", () => {
    const prevSong = getPrevSong(); // return {audio, thumbnail}
    onSongChange(prevSong.thumbnail, prevSong.audio);
  });

  // Autoplay next song when current ends
  audio.addEventListener("ended", () => {
    const nextSong = getNextSong();
    onSongChange(nextSong.thumbnail, nextSong.audio);
  });
