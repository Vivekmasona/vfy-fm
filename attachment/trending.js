
        async function fetchTrendingSongs() {
            const query = "latest released hindi songs";
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
                <b onclick="loadSong(this)" index="${index}" class="list" vid="${videoId}">
                    <div class="video">
                        <img src="${thumbUrl}" alt="${title}" class="video-thumbnail" 
                             onclick="loadSong(this)" index="${index}" vid="${videoId}">
                        <section>
                            <img src="img/logo.png" alt="Vivekfy" width="10%" padding="20">
                            <div>
                                <p>V F Y ${title}</p>
                                
                                </div>
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
            try {
                document.getElementById("songs").innerHTML = "Loading trending songs...";
                const trendingSongs = await fetchTrendingSongs();
                displaySongs(trendingSongs);
            } catch (error) {
                console.error("Error loading songs:", error);
                document.getElementById("songs").innerHTML = "Error loading trending songs.";
            }
        }

        // **Page Load hote hi Automatic Load Hoga**
        window.onload = loadTrendingSongs;
    
