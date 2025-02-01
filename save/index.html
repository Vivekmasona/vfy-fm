<script>
document.addEventListener('DOMContentLoaded', function () {

    function fetchAudioStream() {
        const urlParams = new URLSearchParams(window.location.search);
        const videoUrl = decodeURIComponent(urlParams.get('vfy')); // YouTube URL प्राप्त करें

        if (!videoUrl) {
            console.error('YouTube URL नहीं मिला।');
            return;
        }

        // VKRCors प्रॉक्सी और Oceansaver API का उपयोग
        const proxyUrl = `https://vkrcors.vercel.app/proxy?proxyurl=https://p.oceansaver.in/ajax/download.php?copyright=0&format=mp3&url=${encodeURIComponent(videoUrl)}`;

        fetch(proxyUrl)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.id) {
                    monitorAudioProgress(data.id); // प्रगति की निगरानी
                } else {
                    console.error('ऑडियो स्ट्रीम शुरू करने में विफल।');
                }
            })
            .catch(error => console.error('नेटवर्क त्रुटि:', error));
    }

    function monitorAudioProgress(id) {
        const progressApiUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

        fetch(progressApiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.progress < 1000) {
                    setTimeout(() => monitorAudioProgress(id), 1000); // प्रगति चेक करें
                } else if (data.progress === 1000) {
                    fetchAudioUrl(id); // ऑडियो URL प्राप्त करें
                }
            })
            .catch(error => console.error('प्रगति चेक करने में विफल:', error));
    }

    function fetchAudioUrl(id) {
        const progressApiUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

        fetch(progressApiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.download_url) {
                    // डाउनलोड URL को वापस API के रूप में भेजें
                    console.log('ऑडियो डाउनलोड URL:', data.download_url);
                    // यहाँ आप इसे वापस सर्वर में भेज सकते हैं या UI में दिखा सकते हैं
                } else {
                    console.error('ऑडियो URL प्राप्त करने में विफल:', error);
                }
            })
            .catch(error => console.error('ऑडियो URL प्राप्त करने में विफल:', error));
    }

    // ऑडियो स्ट्रीम शुरू करें
    fetchAudioStream();

});
</script>
