

<script src="https://cdn.socket.io/4.7.1/socket.io.min.js"></script>
<script>
  const serverUrl = "https://vfylive.onrender.com"; 
  const socket = io(serverUrl, { autoConnect: true });

  const statusDot = document.getElementById("statusDot");
  const infoText = document.getElementById("infoText");

  let currentSession = null;

  function joinSession(sid) {
    if (!sid) return;
    currentSession = sid;
    socket.emit("join-session", { sessionId: sid });
    infoText.textContent = "Joined session";
  }

  // Auto-join using sessionId from localStorage
  window.addEventListener('load', () => {
    const savedSession = localStorage.getItem("sessionId");
    if (savedSession) {
      joinSession(savedSession);
    } else {
      infoText.textContent = "No session found";
    }
  });

  // both-present event → glow green dot
  socket.on("both-present", (data) => {
    if (!currentSession || data.sessionId !== currentSession) return;
    if (data.bothPresent) {
      statusDot.classList.add("glow");
      statusDot.title = "2+ users in same session";
      infoText.textContent = "Multiple users online";
    } else {
      statusDot.classList.remove("glow");
      statusDot.title = "waiting for another user";
      infoText.textContent = "Waiting for others...";
    }
  });

  socket.on("connect", () => {
    console.log("Connected to server", socket.id);
  });
  socket.on("disconnect", () => {
    statusDot.classList.remove("glow");
    infoText.textContent = "Disconnected";
  });
</script>
</body>
</html>
