async function fetchTrendingSongs(query) {
    const apiUrl = `https://self-lac.vercel.app/v3-api?q=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error fetching trending songs:", error);
        return [];
    }
}

function createPlaylistSongElement(videoId, title, channelTitle, videoDate, index) {
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    return `
<div style="margin-bottom:12px;">
  <b index="${index}" class="music-item list" vid="${videoId}" onclick="selectItem(this)">
      
      <!-- Thumbnail -->
      <div class="thumb-wrap">
          <img src="${thumbUrl}" alt="${title}">
          <div class="overlay-play">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="transparent">
                  <path d="M3 22v-20l18 10-18 10z"/>
              </svg>
          </div>
      </div>

      <!-- Title -->
      <div class="title">${title}</div>

      <!-- Save button -->
      <button class="save-btn" onclick="event.stopPropagation(); saveFavorite(${index}, '${title}', '${thumbUrl}', '${videoId}')">
          <i class="fas fa-heart"></i>
      </button>

  </b>
</div>
`;
}

function displaySongs(songs) {
    const songsContainer = document.getElementById("songs");
    songsContainer.innerHTML = "";
    if (songs.length === 0) {
        songsContainer.innerHTML = "<p>No trending songs found.</p>";
        return;
    }
    songs.forEach((song, index) => {
        const videoId = song.id.videoId;
        const title = song.snippet.title;
        const channelTitle = song.snippet.channelTitle;
        const videoDate = song.snippet.publishedAt;
        const songElement = createPlaylistSongElement(videoId, title, channelTitle, videoDate, index);
        songsContainer.innerHTML += songElement;
    });
}

async function loadTrendingSongs() {
    const userQuery = localStorage.getItem("songQuery") || "latest released hindi songs";
    document.getElementById("songs").innerHTML = `
      <div class="loading-dots">
          <span></span><span></span><span></span>
      </div>
    `;
    const trendingSongs = await fetchTrendingSongs(userQuery);
    displaySongs(trendingSongs);
}

// 🔄 Page load pe call
window.onload = loadTrendingSongs;
