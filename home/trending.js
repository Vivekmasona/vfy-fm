async function fetchTrendingSongs(query) {
    function playErrorSound() {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play();
    }

    const blockedPattern = /(tuntun|tutun|tun|टुन|टुनटुन)/i;

    if (blockedPattern.test(query.toLowerCase())) {
        console.warn("❌ Blocked query detected:", query);
        playErrorSound();
        alert("❌ This search query is not allowed!");
        document.getElementById("songs").innerHTML =
            "<p style='color:red;'>⚠️ This search query is blocked.</p>";
        return [];
    }

    const denoApiUrl = `https://vivekmasona-denocall-61.deno.dev/search?q=${encodeURIComponent(query)}`;
    const selfApiUrl = `https://self-lac.vercel.app/v3-api?q=${encodeURIComponent(query)}`;
    
    try {
        // First API call
        let response = await fetch(denoApiUrl);

        if (response.ok) {
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                console.log("✅ Songs loaded from Deno API");
                return data.items;
            }
        }

        console.log("⚠️ Deno API failed, trying Self API...");

        // Fallback API call
        response = await fetch(selfApiUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("✅ Songs loaded from Self API");
        return data.items || [];

    } catch (error) {
        console.error("Error fetching trending songs:", error);
        return [];
    }
}

function createPlaylistSongElement(videoId, title, channelTitle, videoDate, index) {
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    // Single quotes ka issue fix karne ke liye replace lagaya hai
    const safeTitle = title.replace(/'/g, "\\'");

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

      <button class="save-btn"
          onclick="event.stopPropagation(); saveFavorite(${index}, '${safeTitle}', '${thumbUrl}', '${videoId}')">
          <i class="fas fa-heart"></i>
      </button>

  </b>
</div>
`;
}

function displaySongs(songs) {
    const songsContainer = document.getElementById("songs");
    if (!songsContainer) return;
    
    songsContainer.innerHTML = "";

    if (songs.length === 0) {
        songsContainer.innerHTML = "<p>No trending songs found.</p>";
        return;
    }

    let htmlContent = "";
    songs.forEach((song, index) => {
        const videoId = song.id.videoId;
        const title = song.snippet.title;
        const channelTitle = song.snippet.channelTitle;
        const videoDate = song.snippet.publishedAt;

        htmlContent += createPlaylistSongElement(
            videoId,
            title,
            channelTitle,
            videoDate,
            index
        );
    });
    
    songsContainer.innerHTML = htmlContent;
}

async function loadTrendingSongs() {
    const songsContainer = document.getElementById("songs");
    if (!songsContainer) return;

    const userQuery = localStorage.getItem("songQuery") || "Beatz Bomber song";

    // 1. Turant Skeleton Loader dikhao bina kisi delay ke
    songsContainer.innerHTML = `
<div class="skeleton-list">
    ${Array(8).fill(`
    <div class="skeleton-item">
        <div class="skeleton-thumb"></div>
        <div class="skeleton-content">
            <div class="skeleton-line line1"></div>
            <div class="skeleton-line line2"></div>
        </div>
        <div class="skeleton-heart"></div>
    </div>
    `).join("")}
</div>
`;

    // 2. Blocked Pattern Check
    const blockedPattern = /(tuntun|tutun|tun|टुन|टुनटुन)/i;
    if (blockedPattern.test(userQuery.toLowerCase())) {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play().catch(e => console.log("Audio play blocked by browser"));
        
        alert("❌ Blocked search detected in saved query!");
        localStorage.removeItem("songQuery");
        songsContainer.innerHTML = "<p style='color:red;'>⚠️ Blocked search term detected. Please try another keyword.</p>";
        return;
    }

    // 3. API se gaane fetch karo
    const trendingSongs = await fetchTrendingSongs(userQuery);
    displaySongs(trendingSongs);
}

// 🚀 WINDOW.ONLOAD KI JAGAH ISKA USE KIYA HAI (FAST LOADING KE LIYE)
document.addEventListener("DOMContentLoaded", loadTrendingSongs);
