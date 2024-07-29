<script>
    // Function to get query parameter by name
    function getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    // Function to extract YouTube video ID
    function getYouTubeVideoId(url) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.get('v') || urlObj.pathname.split('/').pop();
    }

    // Main function to handle the download
    async function downloadAudio() {
      const videoUrl = getQueryParam('url');
      if (!videoUrl) {
        alert('Please provide a valid YouTube video URL as a query parameter');
        return;
      }

      const videoId = getYouTubeVideoId(videoUrl);
      if (!videoId) {
        alert('Invalid YouTube video URL');
        return;
      }

      const provider = 'https://api.cobalt.tools/api/json';
      const streamUrl = `https://youtu.be/${videoId}`;
      try {
        const response = await fetch(provider, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: streamUrl,
            isAudioOnly: true,
            aFormat: 'mp3', // Assuming mp3 format for simplicity
            filenamePattern: 'basic'
          })
        });

        const result = await response.json();
        const anchor = document.createElement('a');
        anchor.href = result.url;
        anchor.download = 'audio.mp3'; // Optional: Set a default download filename
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      } catch (error) {
        alert('Failed to download audio: ' + error.message);
      }
    }

    // Call the main function on page load
    window.onload = downloadAudio;
  </script>
