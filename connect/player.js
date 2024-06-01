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
                        text: 'Here is the session ID: ' + sessionId
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
                    const urlResponse = await fetch('https://bittersweet-pleasant-scent.glitch.me/current-url/' + sessionId);
                    const data = await urlResponse.json();

                    if (data.success && data.sessionId === sessionId) {
                        if (data.url !== audioPlayer.src) {
                            audioPlayer.src = data.url;
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
                        }
                    } else {
                        console.error('Error fetching current URL:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching current URL:', error);
                }
            }

            // Fetch audio status every second
            setInterval(fetchAndUpdateAudioStatus, 1000);
        });
