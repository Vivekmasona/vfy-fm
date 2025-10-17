// —— Inject CSS for loading dots via JS — so कोई external CSS नहीं चाहिए —
(function injectLoadingCSS() {
  const style = document.createElement("style");
  style.textContent = `
    .loading-dots {
      display: inline-block;
      font-size: 20px;
    }
    .loading-dots span {
      animation: blink 1.4s infinite both;
      margin: 0 2px;
      color: #555;
    }
    .loading-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    .loading-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes blink {
      0%, 80%, 100% {
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
})();

// 🔊 Error sound play function
function playErrorSound() {
  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  audio.play();
}

// Block pattern: tun / tutun / tuntun / टुन / टुनटुन
const blockedPattern = /(tuntun|tutun|tun|टुन|टुनटुन)/i;

async function fetchFromApi1(query) {
  const url = `https://vivekmasona-denocall-61.deno.dev/search?q=${encodeURIComponent(query)}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("API1 failed");
  const data = await resp.json();
  return data.items;
}

async function fetchFromApi2(query) {
  const url = `https://self-lac.vercel.app/v3-api1?q=${encodeURIComponent(query)}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("API2 failed");
  const data = await resp.json();
  return data.items;
}

async function fetchTrendingSongs(query) {
  // Block check
  if (blockedPattern.test(query.toLowerCase())) {
    console.warn("❌ Blocked query detected:", query);
    playErrorSound();
    document.getElementById("songs").innerHTML =
      "<p style='color:red;'>⚠️ This search query is blocked.</p>";
    return []; // API को call नहीं करना
  }

  // Show loading dots
  document.getElementById("songs").innerHTML = `
    <div class="loading-dots">
      <span>.</span><span>.</span><span>.</span>
    </div>
  `;

  // Try API1, fallback to API2
  try {
    const items = await fetchFromApi1(query);
    return items;
  } catch (err1) {
    console.warn("API1 failed, falling back to API2:", err1);
    try {
      const items2 = await fetchFromApi2(query);
      return items2;
    } catch (err2) {
      console.error("Both APIs failed:", err2);
      return [];
    }
  }
}

function createPlaylistSongElement(videoId, title, channelTitle, videoDate, index) {
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  return `
<div style="margin-bottom:12px;">
  <b index="${index}" class="music-item list" vid="${videoId}" onclick="handleItemClick(this)">
    <div class="thumb-wrap">
      <img src="${thumbUrl}" alt="${title}">
      <div class="overlay-play">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="transparent">
          <path d="M3 22v-20l18 10-18 10z"/>
        </svg>
      </div>
    </div>
    <div class="title">${title}</div>
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
  if (!songs || songs.length === 0) {
    songsContainer.innerHTML = "<p>No trending songs found.</p>";
    return;
  }
  songs.forEach((song, index) => {
    const videoId = song.id?.videoId || song.videoId;
    const title = song.snippet?.title || song.title;
    const channelTitle = song.snippet?.channelTitle || song.channelTitle;
    const videoDate = song.snippet?.publishedAt || song.publishedAt;
    const songElement = createPlaylistSongElement(videoId, title, channelTitle, videoDate, index);
    songsContainer.innerHTML += songElement;
  });
}

async function loadTrendingSongs() {
  const userQuery = localStorage.getItem("songQuery") || "SR lofi 2.0";
  const songs = await fetchTrendingSongs(userQuery);
  displaySongs(songs);
}

// On load
window.onload = loadTrendingSongs;
