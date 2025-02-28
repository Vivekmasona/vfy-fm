 <script src="https://cdn.socket.io/4.7.1/socket.io.min.js"></script>
  
const socket = io("https://gold-foregoing-change.glitch.me/");

let localStream;
let peerConnection;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
let roomID;
let callTimer;
let callStartTime;

// Ringtone for Incoming Call
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ms.mp3");
ringtone.loop = true;

// Get Popup Elements
const incomingCallPopup = document.getElementById('incomingCall');
const callTimerElement = document.getElementById('callTimer');
const acceptCallButton = document.getElementById('acceptCall');
const rejectCallButton = document.getElementById('rejectCall');
const endCallButton = document.getElementById('endCall');

// Automatically join room if sessionId is found in localStorage
window.addEventListener('load', () => {
    roomID = localStorage.getItem('sessionId');
    if (roomID) {
        socket.emit('join-room', roomID);
        document.getElementById('callUser').disabled = false;
        alert(`Automatically Joined Room: ${roomID}`);
    } else {
        alert('Session ID not found. Please check if it is saved correctly.');
    }
});

// Call User
document.getElementById('callUser').addEventListener('click', async () => {
    socket.emit('call-request', { roomID });
    document.getElementById('callStatus').innerText = 'Calling...';
});

// Incoming Call Popup
socket.on('incoming-call', ({ from }) => {
    incomingCallPopup.style.display = 'block';
    callTimerElement.style.display = 'none';
    acceptCallButton.style.display = 'inline';
    rejectCallButton.style.display = 'inline';
    endCallButton.style.display = 'none';
    ringtone.play();
    document.getElementById('callStatus').innerText = 'Incoming Call...';

    // Accept Call
    acceptCallButton.onclick = async () => {
        ringtone.pause();
        ringtone.currentTime = 0;
        socket.emit('call-accepted', { to: from });
        incomingCallPopup.style.display = 'none';
        document.getElementById('callStatus').innerText = 'Connecting...';

        // Initialize Media
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        peerConnection = new RTCPeerConnection(config);
        peerConnection.addTrack(localStream.getTracks()[0], localStream);

        peerConnection.ontrack = (event) => {
            const remoteAudio = new Audio();
            remoteAudio.srcObject = event.streams[0];
            remoteAudio.play();
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', { candidate: event.candidate, roomID });
            }
        };

        document.getElementById('callStatus').innerText = 'Connected';
        endCallButton.style.display = 'inline';
        callTimerElement.style.display = 'inline';
        startCallTimer();
    };

    // Reject Call
    rejectCallButton.onclick = () => {
        ringtone.pause();
        ringtone.currentTime = 0;
        socket.emit('call-rejected', { to: from });
        incomingCallPopup.style.display = 'none';
        document.getElementById('callStatus').innerText = 'Call Rejected';
    };
});

// Call Accepted
socket.on('call-accepted', async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    peerConnection = new RTCPeerConnection(config);
    peerConnection.addTrack(localStream.getTracks()[0], localStream);

    peerConnection.ontrack = (event) => {
        const remoteAudio = new Audio();
        remoteAudio.srcObject = event.streams[0];
        remoteAudio.play();
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('candidate', { candidate: event.candidate, roomID });
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', { offer, roomID });

    document.getElementById('callStatus').innerText = 'Connected';
    endCallButton.style.display = 'inline';
    callTimerElement.style.display = 'inline';
    startCallTimer();
});

// Handle Offer
socket.on('offer', async ({ offer }) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', { answer, roomID });
});

// Handle Answer
socket.on('answer', async ({ answer }) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

// Handle ICE Candidate
socket.on('candidate', ({ candidate }) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

// End Call
endCallButton.addEventListener('click', () => {
    socket.emit('end-call', roomID);
    endCall();
});

socket.on('call-ended', () => {
    endCall();
});

function endCall() {
    if (peerConnection) peerConnection.close();
    peerConnection = null;
    document.getElementById('callStatus').innerText = 'Call Ended';
    endCallButton.style.display = 'none';
    incomingCallPopup.style.display = 'none';
    stopCallTimer();
}

// Call Timer Functions
function startCallTimer() {
    callStartTime = new Date();
    callTimer = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - callStartTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const seconds = String(elapsed % 60).padStart(2, '0');
        callTimerElement.innerText = `${minutes}:${seconds}`;
    }, 1000);
}

function stopCallTimer() {
    clearInterval(callTimer);
    callTimerElement.innerText = '00:00';
}

