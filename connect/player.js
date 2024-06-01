document.addEventListener('DOMContentLoaded', function () {
            const sessionIdInput = document.getElementById('sessionIdInput');
            const connectButton = document.getElementById('connectButton');
            const playButton = document.getElementById('playButton');
            const pauseButton = document.getElementById('pauseButton');
            const stopButton = document.getElementById('stopButton');
            const volumeSlider = document.getElementById('volumeSlider');
            const seekSlider = document.getElementById('seekSlider');
            const searchForm = document.getElementById('searchForm');
            const playlistContainer = document.getElementById('playlistContainer');
            const searchTermInput = document.getElementById('searchTerm');

            let sessionId = null;
            let lastSeekValue = 0;

            connectButton.onclick = () => {
                sessionId = sessionIdInput.value.trim();
                if (sessionId === '') {
                    alert('Please enter a valid session ID.');
                    return;
                }
                alert('Connected to session ID: ' + sessionId);
            };

            playButton.onclick = () => {
                sendControlCommand('play');
            };

            pauseButton.onclick = () => {
                sendControlCommand('pause');
            };

            stopButton.onclick = () => {
                sendControlCommand('stop');
            };

            volumeSlider.oninput = () => {
                const volume = parseInt(volumeSlider.value);
                sendControlCommand('volume', volume);
            };

            seekSlider.oninput = (event) => {
                const value = event.target.value;
                if (value !== lastSeekValue) {
                    lastSeekValue = value;
                    sendControlCommand('seek', value);
                }
            };

            searchForm.addEventListener('submit', async function (event) {
                event.preventDefault(); // Prevent the default form submission
                const searchTerm = searchTermInput.value.trim();
                const selectedSource = document.querySelector('input[name="source"]:checked').value;

                if (selectedSource === 'directUrl') {
                    const newUrl = searchTerm;
                    if (newUrl !== '') {
                        updateAudioUrl(newUrl);
                    } else {
                        alert('Please enter a valid URL.');
                    }
                } else if (selectedSource === 'youtube') {
                    if (searchTerm !== '') {
                        await fetchYouTubeSongs(searchTerm);
                    } else {
                        alert('Please enter a search term.');
                    }
                } else if (selectedSource === 'swanMusicPlayer') {
                    if (searchTerm !== '') {
                        await searchSongsFromSwan(searchTerm);
                    } else {
                        alert('Please enter a search term.');
                    }
                }
            });

            async function fetchYouTubeSongs(searchTerm) {
                const apiKey = 'AIzaSyAuncZ6zOgCiTErzcEc3cHGuhybV1UIJvA'; // Replace with your YouTube API key
                const maxResults = 40;
                const queryUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${encodeURIComponent(searchTerm)}&maxResults=${maxResults}&videoCategoryId=10&videoSyndicated=true&eventType=none`;

                try {
                    const response = await fetch(queryUrl);
                    const data = await response.json();

                    const videoIds = data.items.map(item => item.id.videoId).join(',');

                    const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,statistics,snippet`);
                    const detailsData = await detailsResponse.json();

                    const songs = detailsData.items.filter(item => {
                        const duration = item.contentDetails.duration;
                        const isLive = item.snippet.liveBroadcastContent === 'none';
                        const viewCount = parseInt(item.statistics.viewCount);
                        return isLive && duration !== 'PT0S' && viewCount > 1000;
                    }).map(item => ({
                        name: item.snippet.title,
                        image: item.snippet.thumbnails.default.url,
                        url: `https://vivekfy.vercel.app/audio?url=https://youtu.be/${item.id}`
                    }));

                    if (songs.length > 0) {
                        displaySongs(songs, 'youtube');
                    } else {
                        alert('No suitable YouTube videos found.');
                    }
                } catch (error) {
                    console.error('Error fetching YouTube songs:', error);
                }
            }

            async function searchSongsFromSwan(searchTerm) {
                if (searchTerm !== '') {
                    try {
                        const response = await fetch(`https://svn-vivekfy.vercel.app/search/songs?query=${encodeURIComponent(searchTerm)}`);
                        const data = await response.json();
                        displaySongs(data.data.results, 'swan');
                    } catch (error) {
                        console.error('Error searching for songs:', error);
                        alert('An error occurred while searching for songs.');
                    }
                } else {
                    alert('Please enter a search term.');
                }
            }

            function displaySongs(songs, source) {
                playlistContainer.innerHTML = ''; // Clear previous results
                songs.forEach(song => {
                    let imageUrl;
                    let songUrl;
                    if (source === 'youtube') {
                        imageUrl = song.image;
                        songUrl = song.url;
                    } else if (source === 'swan') {
                        imageUrl = song.image ? (song.image[2]?.link || song.image) : 'default_image_url.jpg';
                        songUrl = song.downloadUrl[1]?.link;
                    }
                    const listItem = document.createElement('li');
                    listItem.classList.add('playlistItem');
                    listItem.innerHTML = `
                        <img src="${imageUrl}" alt="${song.name}" class="songImage">
                        <div class="songInfo">
                            <div class="songTitle">${song.name}</div>
                            <div>${song.artist || ''}</div>
                        </div>`;
                    listItem.addEventListener('click', () => {
                        updateAudioUrl(songUrl);
                    });
                    playlistContainer.appendChild(listItem);
                });
            }

            function sendControlCommand(action, value = null) {
                if (!sessionId) {
                    alert('Please connect to a session ID first.');
                    return;
                }

                fetch('https://bittersweet-pleasant-scent.glitch.me/control', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ action, value, sessionId })
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => {
                    console.error('Error sending control command:', error);
                    alert('Failed to send control command. Please try again later.');
                });
            }

            function updateAudioUrl(url) {
                if (!sessionId) {
                    alert('Please connect to a session ID first.');
                    return;
                }

                fetch('https://bittersweet-pleasant-scent.glitch.me/update-url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url, sessionId })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert(data.status);
                })
                .catch(error => {
                    console.error('Error updating the URL:', error);
                    alert('Failed to update the URL. Please try again later.');
                });
            }
        });
