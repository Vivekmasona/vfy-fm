 var fullscreen = false;

  // Page load hote hi button ko auto click karwana
  window.onload = function() {
    setTimeout(() => {
      document.getElementById("toggleButton").click(); 
    }, 300); // 300ms delay best for WebView
  };

  // Toggle button click event
  document.getElementById('toggleButton').addEventListener('click', function() {
    if (fullscreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
    fullscreen = !fullscreen;
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

    document.getElementById('fullscreenIcon').style.display = 'none';
    document.getElementById('exitFullscreenIcon').style.display = 'inline';
  }

  // Full screen mode se bahar
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

    document.getElementById('fullscreenIcon').style.display = 'inline';
    document.getElementById('exitFullscreenIcon').style.display = 'none';
  }
