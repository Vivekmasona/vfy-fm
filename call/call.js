// === FRONTEND-ONLY WEBRTC CALL (NO BACKEND) ===

// Global variables
let localStream;
let peerConnection;
let dataChannel;
let roomID;
let callTimer;
let callStartTime;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// Simple ringtone for incoming call
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;

// === Utility ===
function vibrateOnce() {
  if ("vibrate" in navigator) navigator.vibrate(300);
}

// === Auto Load Session ===
window.addEventListener('load', () => {
  roomID = localStorage.getItem('sessionId');
  if (roomID) {
    alert(`Your VFY ID loaded: ${roomID}`);
    document.getElementById('callUser').disabled = false;
  } else {
    roomID = prompt("Enter a new VFY ID:");
    if (roomID) {
      localStorage.setItem('sessionId', roomID);
      alert(`VFY ID created: ${roomID}`);
      document.getElementById('callUser').disabled = false;
    }
  }
});

// === Create Offer ===
document.getElementById('callUser').addEventListener('click', async () => {
  document.getElementById('callStatus').innerText = 'Creating Offer...';
  vibrateOnce();

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  peerConnection = new RTCPeerConnection(config);
  peerConnection.addTrack(localStream.getTracks()[0], localStream);

  // Data channel for signaling manually (copy-paste mode)
  dataChannel = peerConnection.createDataChannel("vfychat");
  dataChannel.onmessage = (e) => console.log("Remote:", e.data);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) return;
    // When ICE gathering is done
    const offer = peerConnection.localDescription;
    document.getElementById('callStatus').innerText = 'Offer Created ✅';
    navigator.clipboard.writeText(JSON.stringify(offer));
    alert("Offer copied to clipboard! Send this text to your friend to connect.");
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
});

// === Accept Incoming Offer ===
async function acceptOffer(offerText) {
  ringtone.play();
  document.getElementById('callStatus').innerText = 'Incoming Call...';
  vibrateOnce();

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  peerConnection = new RTCPeerConnection(config);
  peerConnection.addTrack(localStream.getTracks()[0], localStream);

  peerConnection.ondatachannel = (event) => {
    dataChannel = event.channel;
    dataChannel.onmessage = (e) => console.log("Remote:", e.data);
  };

  peerConnection.ontrack = (event) => {
    const remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) return;
    const answer = peerConnection.localDescription;
    navigator.clipboard.writeText(JSON.stringify(answer));
    ringtone.pause();
    ringtone.currentTime = 0;
    document.getElementById('callStatus').innerText = 'Answer Created ✅';
    alert("Answer copied! Send this back to your friend.");
  };

  await peerConnection.setRemoteDescription(JSON.parse(offerText));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
}

// === Handle Answer ===
async function handleAnswer(answerText) {
  await peerConnection.setRemoteDescription(JSON.parse(answerText));
  document.getElementById('callStatus').innerText = 'Connected 🎧';
  startCallTimer();

  peerConnection.ontrack = (event) => {
    const remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };
}

// === End Call ===
document.getElementById('endCall').addEventListener('click', () => {
  endCall();
  vibrateOnce();
});

function endCall() {
  if (peerConnection) peerConnection.close();
  peerConnection = null;
  stopCallTimer();
  document.getElementById('callStatus').innerText = 'Call Ended';
}

// === Call Timer ===
function startCallTimer() {
  callStartTime = new Date();
  callTimer = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - callStartTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    document.getElementById('callTimer').innerText = `${minutes}:${seconds}`;
  }, 1000);
}
function stopCallTimer() {
  clearInterval(callTimer);
  document.getElementById('callTimer').innerText = '';
}

// === Manual buttons for offer/answer exchange ===
document.addEventListener("DOMContentLoaded", () => {
  const acceptBtn = document.createElement("button");
  acceptBtn.innerText = "Paste Offer to Accept";
  acceptBtn.onclick = () => {
    const txt = prompt("Paste Offer JSON:");
    if (txt) acceptOffer(txt);
  };
  document.body.appendChild(acceptBtn);

  const answerBtn = document.createElement("button");
  answerBtn.innerText = "Paste Answer to Connect";
  answerBtn.onclick = () => {
    const txt = prompt("Paste Answer JSON:");
    if (txt) handleAnswer(txt);
  };
  document.body.appendChild(answerBtn);
});
