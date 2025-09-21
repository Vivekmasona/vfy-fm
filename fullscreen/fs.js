 var fullscreen = false;

    // Trigger fullscreen on page load
    window.onload = function() {
      enterFullScreen();
      fullscreen = true;
    };

    // Toggle button click event
    document.getElementById('toggleButton').addEventListener('click', function() {
      if (fullscreen) {
        exitFullScreen();
      } else {
        enterFullScreen();
      }
      fullscreen = !fullscreen; // Toggle fullscreen variable
    });

    // Full screen mode activate karne ke liye
    function enterFullScreen() {
      var element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }

      // Toggle icons
      document.getElementById('fullscreenIcon').style.display = 'none';
      document.getElementById('exitFullscreenIcon').style.display = 'inline';
    }

    // Full screen mode se bahar nikalne ke liye
    function exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      // Toggle icons
      document.getElementById('fullscreenIcon').style.display = 'inline';
      document.getElementById('exitFullscreenIcon').style.display = 'none';
    }
