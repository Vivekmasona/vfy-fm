
    window.addEventListener('load', function() {
        setTimeout(chhupa, 2000);
        var url = new URL(window.location.toString());

        let songList = [];

        // Load saved songs from local storage
        loadSavedSongs();

        // Agar shared link mein 'preventSearch' attribute nahi hai
        if (!url.searchParams.has('preventSearch')) {
            if (isYouTubeLink(url.searchParams.get('text'))) {
                if (isPlaylistLink(url.searchParams.get('text'))) {
                    // YouTube playlist URL hai, sabhi songs ko alag alag div mein dikhao
                    let playlistId = extractPlaylistId(url.searchParams.get('text'));
                    fetchPlaylist(playlistId);
                } else {
                    // Single YouTube video URL hai, video container mein dikhao
                    let vUrl = document.querySelector('#share_textvkm1m');
                    vUrl.innerText = 'URL - ' + url.searchParams.get('text');

                    let vTitle = document.querySelector('#share_titlevkm1m');
                    vTitle.innerText = 'Title - ' + url.searchParams.get('title');

                    let songContainer = document.querySelector('#song-container');
                    let videoId = extractYouTubeVideoId(url.searchParams.get('text'));
                    let title = url.searchParams.get('title');
                    songList.push({ videoId, title });

                    let songElement = createSongElement(videoId, title, 0);
                    songContainer.appendChild(songElement);

                    // Save song to local storage
                    saveSongToLocal(videoId, title);
                }
            } else if (isUrlLink(url.searchParams.get('text'))) {
                // Other URL hai, download button overlay create karo
                openDownloadPopup(url.searchParams.get('text'));
            } else {
                // Koi text hai, search box mein set karo
                let searchText = extractTextInDoubleQuotes(url.searchParams.get('text')) || url.searchParams.get('text');
                let searchBox = document.querySelector('#search-basic');
                searchBox.value = searchText;
                document.getElementById('search-btn').click();
            }
        }

        // Function to fetch YouTube playlist using API
        function fetchPlaylist(playlistId) {
            fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=AIzaSyBemcQ7KH8CvxN0kKjGK-nhfuBzzTy4KEk`)
            .then(response => response.json())
            .then(data => {
                let songsContainer = document.querySelector('#song-container');
                data.items.forEach((item, index) => {
                    let videoId = item.snippet.resourceId.videoId;
                    let title = item.snippet.title;
                    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
                    let channelTitle = item.snippet.channelTitle;
                    let videoDate = new Date(item.snippet.publishedAt);
                    songList.push({ videoId, title });

                    let songElement = createPlaylistSongElement(videoId, title, thumbnailUrl, channelTitle, videoDate, index);
                    songsContainer.appendChild(songElement);

                    // Save song to local storage
                    saveSongToLocal(videoId, title);
                });

                // Automatic click on the first song
                let firstSongElement = songsContainer.querySelector('.list');
                if (firstSongElement) {
                    firstSongElement.click();
                }
            })
            .catch(error => console.error('Error fetching playlist:', error));
        }

        // Function to handle URL download popup
        function openDownloadPopup(downloadUrl) {
            // Create a popup button at a specific location
            let downloadButton = document.createElement('button');
            downloadButton.className = 'download-popup-button shake';
            downloadButton.innerHTML = `
                <a href="https://vivekfy.vercel.app/api?url=${encodeURIComponent(downloadUrl)}" download><i class="fas fa-download"></i></a>
            `;
            downloadButton.addEventListener('click', function() {
                // Change icon to "done" when clicked
                let icon = downloadButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-download');
                    icon.classList.add('fa-check-circle');
                }
            });
            document.body.appendChild(downloadButton);
        }

        // Check kare ki diya gaya link YouTube link hai ya nahi
        function isYouTubeLink(link) {
            return link.includes('youtube.com') || link.includes('youtu.be');
        }

        // Double quotes ke bheetar text nikalne ka function
        function extractTextInDoubleQuotes(link) {
            let match = link.match(/"([^"]+)"/);
            return match ? match[1].trim() : '';
        }

        // URL link se title ya ID nikalne ka function
        function extractTitleFromUrl(link) {
            // Link se title ya ID nikalne ke liye apni logic add kare
            // Yahan, yeh bas link ko return kar raha hai
            return link;
        }

        // YouTube link se video ID nikalne ka function
        function extractYouTubeVideoId(youtubeUrl) {
            let videoIdMatch = youtubeUrl.match(/[?&]v=([^&]+)/);
            return videoIdMatch ? videoIdMatch[1] : null;
        }

        // URL link ka check
        function isUrlLink(link) {
            // Link ko URL link hone ka check karne ke liye apni logic add kare
            // Yahan, yeh bas 'http' ya 'www' se shuru hota hai, yeh check kar raha hai
            return link.startsWith('http') || link.includes('www');
        }

        // YouTube playlist link ka check
        function isPlaylistLink(link) {
            return link.includes('list='); // Checking if link contains 'list=' which indicates it's a playlist
        }

        // Playlist ID nikalne ka function
        function extractPlaylistId(playlistUrl) {
            let playlistIdMatch = playlistUrl.match(/[?&]list=([^&]+)/);
            return playlistIdMatch ? playlistIdMatch[1] : null;
        }

        // Function to save song details to local storage
        function saveSongToLocal(videoId, title) {
            let songDetails = { videoId: videoId, title: title };
            let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
            savedSongs.push(songDetails);
            localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
        }

        // Function to load saved songs from local storage
        function loadSavedSongs() {
            let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
            let songContainer = document.querySelector('#song-container');
            savedSongs.forEach((song, index) => {
                let songElement = createSongElement(song.videoId, song.title, index);
                songContainer.appendChild(songElement);
                songList.push(song);
            });
        }

        // Function to create playlist song element
        function createPlaylistSongElement(videoId, title, thumbnailUrl, channelTitle, videoDate, index) {
            let output =
                '<b onclick="loadSong(this)" index="' + index + '" class="list" vid="' + videoId + '">' +
                '<div class="video">' +
                '<img src="' + thumbnailUrl + '" alt="' + title + '" class="video-thumbnail" onclick="loadSong(this)" index="' + index + '" vid="' + videoId + '">' +
                '<section>' +
                '<img src="/img/newdp.png" alt="Vivekfy" width="10%" padding="20">' +
                '<div>' +
                '<p>V F Y ' + title + '</p>' +
                '<small class="video-info">' + channelTitle + '</small>' +
                '<small class="video-info"> VFY </small>' +
                '<small class="video-info"> Ai </small>' +
                '<small class="video-info">Release Date: ' + videoDate.toDateString() + '</small>' +
                '</div>' +
                '</section>' +
                '</div>' +
                '</b>';
            let songElement = document.createElement('div');
            songElement.innerHTML = output;

            // Add long press to delete functionality
            songElement.querySelector('.video-thumbnail').addEventListener('contextmenu', function(event) {
                event.preventDefault();
                deleteSong(videoId, index);
            });

            // Add long press event listener for touch devices
            let longPressTimer;
            songElement.addEventListener('touchstart', function(event) {
                longPressTimer = setTimeout(function() {
                    deleteSong(videoId, index);
                }, 60000); // 1 second long press
            });

            songElement.addEventListener('touchend', function(event) {
                clearTimeout(longPressTimer);
            });

            return songElement;
        }

        // Function to create single song element
        function createSongElement(videoId, title, index) {
            let songElement = document.createElement('div');
            songElement.innerHTML = `
                <b onclick="loadSong(this)" class="list" vid="${videoId}" index="${index}" id="song-element-${index}">
                    <div class="video">
                        <img src="https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg" alt="${title}" class="video-thumbnail" vid="${videoId}">
                        <section>
                            <section>
                                <div>
                                    <p>${title}</p>
                                </div>
                            </section>
                        </section>
                    </div>
                </b>`;
            
            // Add long press to delete functionality
            songElement.querySelector('.video-thumbnail').addEventListener('contextmenu', function(event) {
                event.preventDefault();
                deleteSong(videoId, index);
            });

            // Add long press event listener for touch devices
            let longPressTimer;
            songElement.addEventListener('touchstart', function(event) {
                longPressTimer = setTimeout(function() {
                    deleteSong(videoId, index);
                }, 60000); // 1 second long press
            });

            songElement.addEventListener('touchend', function(event) {
                clearTimeout(longPressTimer);
            });

            return songElement;
        }

        // Function to delete song from local storage and DOM
        function deleteSong(videoId, index) {
            let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
            savedSongs = savedSongs.filter(song => song.videoId !== videoId);
            localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
            document.querySelector(`#song-element-${index}`).remove();
        }

        // Function to load song
        function loadSong(element) {
            let videoId = element.getAttribute('vid');
            // Add your logic here to load and play the song using the videoId
            // Example: load the song in an iframe or video player
            document.querySelector('#video-player').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

            // Update the currently playing song in local storage
            localStorage.setItem('currentSong', JSON.stringify({ videoId, index: element.getAttribute('index') }));
        }

        // Function to play the next song in the list
        function playNextSong() {
            let currentSong = JSON.parse(localStorage.getItem('currentSong'));
            if (currentSong) {
                let nextIndex = parseInt(currentSong.index) + 1;
                if (nextIndex < songList.length) {
                    let nextSongElement = document.querySelector(`#song-element-${nextIndex}`);
                    if (nextSongElement) {
                        nextSongElement.click();
                    }
                }
            }
        }

        // Automatically play the next song when the current one ends
        document.querySelector('#video-player').addEventListener('ended', playNextSong);

        function chhupa() {
            document.querySelector('#loadingvkm1m').style.display = "none";
        }
    });
