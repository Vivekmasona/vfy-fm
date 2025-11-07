<script src="hhttps://vfylive.onrender.com/socket.io/socket.io.js"></script>
<script>
const socket = io("hhttps://vfylive.onrender.com");
const greenDot = document.getElementById('greenDot');
const joinBtn = document.getElementById('joinBtn');
const sessionInput = document.getElementById('sessionInput');

let sessionId;

// Function to join session
function joinSession(id) {
    sessionId = id;
    localStorage.setItem('sessionId', sessionId); // store in localStorage
    socket.emit('join-room', sessionId);
    console.log("Joined session:", sessionId);
}

// Auto join if localStorage has sessionId
window.addEventListener('load', () => {
    const storedId = localStorage.getItem('sessionId');
    if (storedId) joinSession(storedId);
});

// Manual join button
joinBtn.addEventListener('click', () => {
    const id = sessionInput.value.trim();
    if (id) joinSession(id);
    else alert("Enter a valid session ID");
});

// Listen for other users joining the same session
socket.on('same-session-connected', (data) => {
    console.log(data.message);
    greenDot.style.backgroundColor = 'green'; // glow green
    alert(data.message); // optional popup
});

// Optional: reset dot when everyone leaves
socket.on('disconnect', () => {
    greenDot.style.backgroundColor = 'gray';
});
</script>
