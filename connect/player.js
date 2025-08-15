document.addEventListener('DOMContentLoaded', function () {
            const audioPlayer = document.getElementById('audioPlayer');
            const playPauseButton = document.getElementById('playPauseButton');
            const playIcon = document.getElementById('playIcon');
            const sessionIdElement = document.getElementById('sessionId');
            const sessionIdValue = document.getElementById('sessionIdValue');
            const editSessionIdButton = document.getElementById('editSessionIdButton');
            const copySessionIdButton = document.getElementById('copySessionIdButton');
            const shareSessionIdButton = document.getElementById('shareSessionIdButton');
            const audioPlayerContainer = document.getElementById('audioPlayerContainer');
            let sessionId = localStorage.getItem('sessionId') || generateSessionId(); // Retrieve session ID or generate if not present
            let isPlaying = false;
            let currentSeekValue = 0;
            let previousSeekValue = 0;
            let playlist = [];
            let currentIndex = -1;
            let isPlayingNextSong = false; // Flag to check if we are playing the next song

            // Function to generate session ID
            function generateSessionId() {
                return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }

            // Function to copy session ID to clipboard
            function copySessionId() {
                navigator.clipboard.writeText(sessionId).then(() => {
                    alert('your ID copied to clipboard');
                }).catch(err => {
                    console.error('Could not copy  ID: ', err);
                });
            }

            // Function to share session ID
            function shareSessionId() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Session ID',
                        text: 'https://vfy.netlify.app Here is the your vfy ID: ' + sessionId
                    }).catch(err => {
                        console.error('Error sharing  ID:', err);
                    });
                } else {
                    alert('Web Share API not supported in this browser.');
                }
            }

            // Function to show buttons and hide session ID after 2 seconds
            setTimeout(() => {
                sessionIdElement.style.display = 'none';
                copySessionIdButton.style.display = 'inline';
                editSessionIdButton.style.display = 'inline';
                shareSessionIdButton.style.display = 'inline';
                copySessionIdButton.addEventListener('click', copySessionId);
                shareSessionIdButton.addEventListener('click', shareSessionId);
            }, 2000);

            playPauseButton.onclick = () => {
                if (isPlaying) {
                    audioPlayer.pause();
                } else {
                    audioPlayer.play();
                }
            };

            function updatePlayPauseIcon() {
                if (audioPlayer.paused) {
                    playIcon.setAttribute('d', 'M8 5v14l11-7z'); // Play icon
                    isPlaying = false;
                } else {
                    playIcon.setAttribute('d', 'M6 19h4V5H6zm8-14v14h4V5z'); // Pause icon
                    isPlaying = true;
                }
            }

            audioPlayer.onplay = updatePlayPauseIcon;
            audioPlayer.onpause = updatePlayPauseIcon;

            // Function to edit session ID
            editSessionIdButton.addEventListener('click', function () {
                const newSessionId = prompt('Enter new  ID:');
                if (newSessionId && newSessionId.trim() !== '') {
                    sessionId = newSessionId.trim();
                    localStorage.setItem('sessionId', sessionId);
                    sessionIdValue.textContent = sessionId;
                    alert('vfy ID edited to: ' + sessionId);
                }
            });

            // Function to fetch current audio URL and play
            async function fetchAndUpdateAudioStatus() {
                try {
                    const urlResponse = await fetch('https://audio-remote.onrender.com/current-url/' + sessionId);
                    const data = await urlResponse.json();

                    if (data.success && data.sessionId === sessionId) {
                        playlist = data.playlist;
                        currentIndex = data.currentIndex;

                        if (data.url !== audioPlayer.src) {
                            audioPlayer.src = data.url;
                            updateMediaSession(data.title, data.thumbnail, data.url);
                        }
                        audioPlayer.volume = data.volume / 100;

                        if (!isPlayingNextSong) { // Ignore play command if the next song is being played
                            if (data.action === 'play') {
                                audioPlayer.play();
                            } else if (data.action === 'pause') {
                                audioPlayer.pause();
                            } else if (data.action === 'stop') {
                                audioPlayer.pause();
                                audioPlayer.currentTime = 0;
                            } else if (data.action === 'volume') {
                                audioPlayer.volume = data.value / 100;
                            } else if (data.action === 'seek') {
                                currentSeekValue = data.value;
                                if (currentSeekValue !== previousSeekValue) {
                                    audioPlayer.currentTime = (audioPlayer.duration * currentSeekValue) / 100;
                                    previousSeekValue = currentSeekValue;
                                }
                            } else if (data.action === 'previous') {
                                playPreviousSong();
                            } else if (data.action === 'loop') {
                                audioPlayer.loop = data.value === 'on';
                            }
                        }
                    } else {
                        console.error('Error fetching current URL:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching current URL:', error);
                }
            }

            // Function to play the next song and automatically play it after 1 second
            function playNextSong() {
                if (playlist.length > 0) {
                    currentIndex = (currentIndex + 1) % playlist.length;
                    const nextSong = playlist[currentIndex];
                    audioPlayer.src = nextSong.url;
                    updateMediaSession(nextSong.title, nextSong.thumbnail, nextSong.url);

                    // Set flag to prevent multiple triggers
                    isPlayingNextSong = true;

                    // Send play command after 1 second
                    setTimeout(() => {
                        audioPlayer.play();
                        sendControlCommand('play'); // Send play command after the next song starts
                        isPlayingNextSong = false; // Reset flag after starting playback
                    }, 1000);
                }
            }

            // Function to play the previous song
            function playPreviousSong() {
                if (playlist.length > 0) {
                    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
                    const previousSong = playlist[currentIndex];
                    audioPlayer.src = previousSong.url;
                    updateMediaSession(previousSong.title, previousSong.thumbnail, previousSong.url);
                    audioPlayer.play();
                }
            }

            // Function to send control command to server
            function sendControlCommand(action) {
                const requestPayload = { action, sessionId };
                fetch('https://audio-remote.onrender.com/control', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestPayload)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (!data.success) {
                        console.error('Error sending control command:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Error sending control command:', error);
                });
            }

            // Event listener to handle autoplay of the next song when the current song ends
            audioPlayer.addEventListener('ended', function() {
                sendControlCommand('next'); // Trigger next button action and send command to server
                playNextSong(); 
// Start the next song
                setTimeout(() => {
                    if (audioPlayer.src !== "") {
                        audioPlayer.play(); // Automatically play the next song after 1 second
                        sendControlCommand('play'); // Send play command immediately after playing the next song
                    }
                }, 1000);
            });

            // Fetch audio status every second
            setInterval(fetchAndUpdateAudioStatus, 1000);

            // Function to update Media Session API metadata
            function updateMediaSession(title, thumbnail, url) {
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: title,
                        artist: 'vivekfy remote',
                        album: 'Album Name',
                        artwork: [
                            { src: thumbnail, sizes: '512x512', type: 'image/png' }
                        ]
                    });

                    // Update background image of audio player container
                    audioPlayerContainer.style.backgroundImage = `url(${thumbnail})`;
                    audioPlayerContainer.style.backgroundSize = 'cover';
                    audioPlayerContainer.style.backgroundPosition = 'center';

                    navigator.mediaSession.setActionHandler('play', function() {
                        audioPlayer.play();
                    });
                    navigator.mediaSession.setActionHandler('pause', function() {
                        audioPlayer.pause();
                    });
                    navigator.mediaSession.setActionHandler('seekbackward', function() {
                        audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0);
                    });
                    navigator.mediaSession.setActionHandler('seekforward', function() {
                        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 10, audioPlayer.duration);
                    });
                }
            }
        });
