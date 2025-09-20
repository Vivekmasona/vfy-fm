document.addEventListener('DOMContentLoaded', function () {
        var completeDeviceName = WURFL.complete_device_name;
        var brandName = completeDeviceName.split(" ")[0];

        var brandNameElement = document.getElementById('brandName');
        brandNameElement.innerText = brandName;

        // Check if audio is already stored in sessionStorage
        var savedAudioUrl = sessionStorage.getItem('deviceAudioUrl');

        brandNameElement.addEventListener('click', function () {
            if (!savedAudioUrl) {
                // Generate TTS URL and store it only on first click
                savedAudioUrl = 'https://vivekfy.vercel.app/tts/v2?text=' + encodeURIComponent(completeDeviceName);
                sessionStorage.setItem('deviceAudioUrl', savedAudioUrl);
            }

            // Play the stored or newly generated audio
            var audio = new Audio(savedAudioUrl);
            audio.play();
        });
    });

    // Clear sessionStorage when user navigates back or refreshes the page
    window.addEventListener('beforeunload', function () {
        sessionStorage.clear();
    });
