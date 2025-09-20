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
        <b index="${index}" class="list" vid="${videoId}" style="position:relative;">
            <div class="video" style="position:relative;">
                <i class="fas fa-heart save-icon" 
                   onclick="event.stopPropagation(); saveFavorite(${index}, '${title}', '${thumbUrl}', '${videoId}')"></i>
                <img src="${thumbUrl}" alt="${title}" 
                     class="video-thumbnail" index="${index}" vid="${videoId}" 
                     data-thumb="${thumbUrl}" style="width:100%;">
                <div class="overlay-play" style="position:absolute; top:10px; right:10px; width:40px; height:40px; background: transparent; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:10;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="transparent"><path d="M3 22v-20l18 10-18 10z"/></svg>
                </div>
                <section>
                    <img src="img/logo.png" alt="Vivekfy" width="10%" padding="20">
                    <div><p>V F Y ${title}</p></div>
                </section>
            </div>
        </b>`;
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
