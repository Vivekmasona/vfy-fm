
    const disconnectAudio = document.getElementById("disconnectAudio");
    const connectAudio = document.getElementById("connectAudio");
    const internetCheckInterval = 100; // Check every 5 seconds (adjust as needed)
    let wasOnline = true;

    function checkInternetConnection() {
      const online = window.navigator.onLine;

      if (!online && wasOnline) {
        disconnectAudio.play();
        wasOnline = false;
      } else if (online && !wasOnline) {
        connectAudio.play();
        wasOnline = true;
      }
    }

    setInterval(checkInternetConnection, internetCheckInterval);
  












        

