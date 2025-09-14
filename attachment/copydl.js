
        let lastClipboardText = "";
        let detectedURL = "";
        let audioPlayer = document.getElementById("soundPlayer");

        // Start checking clipboard every second
        setInterval(checkClipboard, 1000);

        function checkClipboard() {
            navigator.clipboard.readText()
                .then(function (clipboardText) {
                    if (clipboardText && clipboardText !== lastClipboardText) {
                        lastClipboardText = clipboardText;
                        let linkType = identifyLinkType(clipboardText);
                        if (linkType !== 'unknown') {
                            detectedURL = clipboardText;
                            playSound(linkType);  // Auto-play sound
                            document.getElementById('downloadButton1').style.display = 'inline-block';
                        }
                    }
                })
                .catch(function (err) {
                    console.error('Clipboard read failed: ', err);
                });
        }

        function identifyLinkType(link) {
            let lowerLink = link.toLowerCase();
            if (lowerLink.includes('instagram')) return 'instagram';
            if (lowerLink.includes('facebook') || lowerLink.includes('fb')) return 'facebook';
            if (lowerLink.includes('youtube.com') || lowerLink.includes('youtu.be')) return 'youtube';
            return 'unknown';
        }

        function playSound(linkType) {
            let sounds = {
                'instagram': '/sound/copyinstagram.mp3',
                'facebook': '/sound/copyfacebook.mp3',
                'youtube': '/sound/copyyoutube.mp3'
            };

            let soundURL = sounds[linkType] || '/sound/default_sound.mp3';

            audioPlayer.src = soundURL;
            audioPlayer.play().catch(err => console.error("Playback error:", err));
        }

        function startDownload() {
            if (detectedURL) {
                window.location.href = `https://vivekfy.vercel.app/api?url=${encodeURIComponent(detectedURL)}`;
            }
        }
    
