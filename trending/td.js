
  document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://vivekfy.vercel.app/search?q=bhojpuri+holi+songs';
    const videosContainer = document.getElementById('videos');

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const videos = data.results; // Adjust according to your API response structure

        videos.forEach(video => {
          const videoElement = document.createElement('b');
          videoElement.classList.add('list');
          videoElement.setAttribute('onclick', 'loadSong(this)');
          videoElement.setAttribute('vid', video.id); // Assuming video ID is in 'id'

          videoElement.innerHTML = `
            <div class="video">
              <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
              <section>
                <div>
                  <p>${video.title}</p>
                </div>
              </section>
            </div>
          `;

          videosContainer.appendChild(videoElement);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  function loadSong(element) {
    const videoId = element.getAttribute('vid');
    console.log('Loading song with video ID:', videoId);

    // Example: Update a specific part of your page or player
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = `Loading song with ID: ${videoId}`;

    // You might want to add logic here to actually play the video or song
    // For instance, you could send a request to your server to fetch and play the song
  }

