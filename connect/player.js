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
            showTemporaryAlert('Session ID copied to clipboard');
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
            showTemporaryAlert('Web Share API not supported in this browser.');
        }
    }

    // Function to show temporary alert message
    function showTemporaryAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.textContent = message;
        alertBox.classList.add('alert');
        document.body.appendChild(alertBox);
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 500);
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
            showTemporaryAlert('Session ID edited to: ' + sessionId);
        }
    });

    // Function to fetch playlist data
    async function fetchPlaylist() {
        try {
            const urlResponse = await fetch('https://forest-season-patella.glitch.me/current-url/' + sessionId);
            const data = await urlResponse.json();

            if (data.success && data.sessionId === sessionId) {
                playlist = data.playlist;
                currentIndex = data.currentIndex;
                playCurrentSong();
            } else {
                console.error('Error fetching playlist:', data.error);
            }
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    }

    // Function to play the current song
    function playCurrentSong() {
        if (playlist.length > 0 && currentIndex >= 0 && currentIndex < playlist.length) {
            const currentSong = playlist[currentIndex];
            audioPlayer.src = currentSong.url;
            updateMediaSession(currentSong.title, currentSong.thumbnail, currentSong.url);
            audioPlayer.play();
        }
    }

    // Function to play the next song
    function playNextSong() {
        if (playlist.length > 0) {
            currentIndex = (currentIndex + 1) % playlist.length;
            playCurrentSong();
        }
    }

    // Function to play the previous song
    function playPreviousSong() {
        if (playlist.length > 0) {
            currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
            playCurrentSong();
        }
    }

    // Event listener to handle autoplay of the next song when current song ends
    audioPlayer.addEventListener('ended', function() {
        playNextSong();
    });

    // Fetch playlist data on load
    fetchPlaylist();

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
            navigator.mediaSession.setActionHandler('previoustrack', function() {
                playPreviousSong();
            });
            navigator.mediaSession.setActionHandler('nexttrack', function() {
                playNextSong();
            });
        }
    }
});
