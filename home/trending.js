async function fetchTrendingSongs(query) {

    // 🔊 Error sound function
    function playErrorSound() {
        const audio = new Audio("https://us-tuna-sounds-files.voicemod.net/5e4ffa1a-9ccb-4d00-804a-a45b010b6d76-1671532580020.mp3");
        audio.play();
    }

    // ❌ Block pattern – tun / tutun / tuntun / टुन / टुनटुन सब पकड़ेगा
    const blockedPattern = /(tuntun|tutun|tun|टुन|टुनटुन)/i;

    // ✅ पहले query check करो (search API call से पहले)
    if (blockedPattern.test(query.toLowerCase())) {
        console.warn("❌ Blocked query detected:", query);
        playErrorSound(); // error beep बजाओ
        alert("❌ This search query is not allowed!");
        document.getElementById("songs").innerHTML =
            "<p style='color:red;'>⚠️ This search query is blocked.</p>";
        return []; // ❌ कोई API call मत करो
    }

    // ✅ अगर safe है तभी API चलाओ
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
  <b index="${index}" class="music-item list" vid="${videoId}" onclick="handleItemClick(this)">
      
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
    const userQuery = localStorage.getItem("songQuery") || "SR lofi 2.0";

    document.getElementById("songs").innerHTML = `
      <div class="loading-dots">
          <span></span><span></span><span></span>
      </div>
    `;

    // ✅ यहाँ भी double-check ताकि saved query block हो तो भी API call न जाए
    const blockedPattern = /(tuntun|tutun|tun|टुन|टुनटुन)/i;
    if (blockedPattern.test(userQuery.toLowerCase())) {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play();
        alert("❌ Blocked search detected in saved query!");
        localStorage.removeItem("songQuery");
        document.getElementById("songs").innerHTML =
            "<p style='color:red;'>⚠️ Blocked search term detected. Please try another keyword.</p>";
        return;
    }

    const trendingSongs = await fetchTrendingSongs(userQuery);
    displaySongs(trendingSongs);
}

// Page load pe call
window.onload = loadTrendingSongs;
