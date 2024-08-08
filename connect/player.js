document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPlayerContainer = document.getElementById('audioPlayerContainer');
    const playPauseButton = document.getElementById('playPauseButton');
    const playIcon = document.getElementById('playIcon');
    const sessionIdElement = document.getElementById('sessionId');
    const editSessionIdButton = document.getElementById('editSessionIdButton');
    const copySessionIdButton = document.getElementById('copySessionIdButton');
    const shareSessionIdButton = document.getElementById('shareSessionIdButton');
    let sessionId = localStorage.getItem('sessionId');
    let isPlaying = false;
    let currentSeekValue = 0;
    let previousSeekValue = 0;
    let playlist = [];
    let currentIndex = -1;

    // Generate a session ID if not already present
    if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('sessionId', sessionId);
    }

    sessionIdElement.textContent = sessionId;

    // Function to generate session ID
    function generateSessionId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Function to copy session ID to clipboard
    function copySessionId() {
        navigator.clipboard.writeText(sessionId).then(() => {
            alert('Session ID copied to clipboard');
        }).catch(err => {
            console.error('Could not copy session ID: ', err);
        });
    }

    // Function to share session ID
    function shareSessionId() {
        if (navigator.share) {
            navigator.share({
                title: 'Session ID',
                text: 'https://vfy.netlify.app Here is the session ID: ' + sessionId
            }).catch(err => {
                console.error('Error sharing session ID:', err);
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
            audioPlayerContainer.classList.remove('glow'); // Remove glow class
        } else {
            playIcon.setAttribute('d', 'M6 19h4V5H6zm8-14v14h4V5z'); // Pause icon
            isPlaying = true;
            audioPlayerContainer.classList.add('glow'); // Add glow class
        }
    }

    audioPlayer.onplay = updatePlayPauseIcon;
    audioPlayer.onpause = updatePlayPauseIcon;

    // Function to edit session ID
    editSessionIdButton.addEventListener('click', function () {
        const newSessionId = prompt('Enter new session ID:');
        if (newSessionId && newSessionId.trim() !== '') {
            sessionId = newSessionId.trim();
            localStorage.setItem('sessionId', sessionId);
            sessionIdElement.textContent = sessionId;
            alert('Session ID edited to: ' + sessionId);
        }
    });

    // Function to fetch current audio URL and play
    async function fetchAndUpdateAudioStatus() {
        try {
            const urlResponse = await fetch('https://forest-season-patella.glitch.me/current-url/' + sessionId);
            const data = await urlResponse.json();

            if (data.success && data.sessionId === sessionId) {
                playlist = data.playlist;
                currentIndex = data.currentIndex;

                if (data.url !== audioPlayer.src) {
                    audioPlayer.src = data.url;
                    updateMediaSession(data.title, data.thumbnail, data.url);
                }
                audioPlayer.volume = data.volume / 100;
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
                } else if (data.action === 'next') {
                    playNextSong();
                } else if (data.action === 'previous') {
                    playPreviousSong();
                } else if (data.action === 'loop') {
                    audioPlayer.loop = data.value === 'on';
                }
            } else {
                console.error('Error fetching current URL:', data.error);
            }
        } catch (error) {
            console.error('Error fetching current URL:', error);
        }
    }

    // Function to play the next song
    function playNextSong() {
        if (playlist.length > 0) {
            currentIndex = (currentIndex + 1) % playlist.length;
            const nextSong = playlist[currentIndex];
            audioPlayer.src = nextSong.url;
            updateMediaSession(nextSong.title, nextSong.thumbnail, nextSong.url);
            audioPlayer.play();
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

    // Event listener to handle autoplay of the next song when current song ends
    audioPlayer.addEventListener('ended', function() {
        if (audioPlayer.loop) {
            audioPlayer.play(); // Loop the current song if loop is enabled
        } else {
            playNextSong(); // Play the next song in the playlist
        }
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

