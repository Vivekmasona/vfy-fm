document.addEventListener('DOMContentLoaded', function () {
            const musicPlayerContainer = document.getElementById('musicPlayerContainer');
            const audioPlayer = document.getElementById('audioPlayer');
            const sessionIdElement = document.getElementById('sessionId');
            const copySessionIdButton = document.getElementById('copySessionId');
            const renameSessionIdButton = document.getElementById('renameSessionIdButton');
            const newSessionIdInput = document.getElementById('newSessionId');
            const saveSessionIdButton = document.getElementById('saveSessionId');
            const playerTab = document.getElementById('playerTab');
            const togglePlayerButton = document.getElementById('togglePlayerButton');

            let isPlayerOpen = false;
            let sessionId = localStorage.getItem('sessionId');

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

            // Function to fetch current URL and play audio
            function fetchCurrentUrl(sessionId) {
                fetch(`https://helpful-gleaming-restaurant.glitch.me/current-url/${sessionId}`)
                    .then(response => response.json())
                    .then(data => {
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
                            }
                        } else {
                            console.error('Error fetching current URL:', data.error);
                        }
                    })
                    .catch(error => console.error('Error fetching current URL:', error));
            }

            // Function to periodically check for URL updates
            function checkForUpdates() {
                setInterval(() => {
                    fetchCurrentUrl(sessionId);
                }, 1000); // Check every second
            }

            // Initial call to fetch current URL
            fetchCurrentUrl(sessionId);

            // Start checking for updates
            checkForUpdates();

            // Function to copy session ID
            copySessionIdButton.addEventListener('click', function () {
                navigator.clipboard.writeText(sessionId).then(() => {
                    alert('Session ID copied to clipboard');
                }).catch(err => {
                    console.error('Could not copy session ID: ', err);
                });
            });

            // Function to rename session ID
            renameSessionIdButton.addEventListener('click', function () {
                newSessionIdInput.style.display = 'inline';
                newSessionIdInput.value = sessionId;
                saveSessionIdButton.style.display = 'inline';
            });

            // Function to save renamed session ID
            saveSessionIdButton.addEventListener('click', function () {
                const newSessionId = newSessionIdInput.value.trim();
                if (newSessionId !== '' && newSessionId !== sessionId) {
                    sessionId = newSessionId;
                    localStorage.setItem('sessionId', sessionId);
                    sessionIdElement.textContent = sessionId;
                    newSessionIdInput.style.display = 'none';
                    saveSessionIdButton.style.display = 'none';
                    alert('Session ID renamed to: ' + sessionId);
                }
            });

            // Function to toggle the music player visibility
            function togglePlayer() {
                isPlayerOpen = !isPlayerOpen;
                if (isPlayerOpen) {
                    musicPlayerContainer.classList.remove('hidden');
                    positionPlayer();
                } else {
                    musicPlayerContainer.classList.add('hidden');
                }
            }

            // Function to position the music player
            function positionPlayer() {
                // Position the player centrally initially
                // Code to position centrally

                // After 5 seconds, move the player to the right corner
                setTimeout(() => {
                    // Code to move to right corner
                }, 5000);
            }

            // Function to handle click on the toggle player button
            togglePlayerButton.addEventListener('click', togglePlayer);

            // Function to handle click outside the music player to close it
            document.addEventListener('click', function(event) {
                if (!musicPlayerContainer.contains(event.target) && !playerTab.contains(event.target)) {
                    musicPlayerContainer.classList.add('hidden');
                }
            });
        });
