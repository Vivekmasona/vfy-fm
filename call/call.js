// === Frontend-only WebRTC Audio Call ===
// No server, only STUN relay (Google public)

let localStream;
let peerConnection;
let dataChannel;
let remoteAudio;
let callTimer;
let callStartTime;

// Public Google STUN server
const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

// Generate local ID (share manually or via QR)
let roomID = localStorage.getItem("sessionId");
if (!roomID) {
  roomID = "VFY_" + Math.random().toString(36).substring(2, 8);
  localStorage.setItem("sessionId", roomID);
}
alert("Your VFY ID: " + roomID);

// Simple signaling exchange manually via textarea or QR (no server)
const signalBox = document.getElementById("signalBox");
const signalInput = document.getElementById("signalInput");
const callBtn = document.getElementById("callUser");
const answerBtn = document.getElementById("answerUser");
const endBtn = document.getElementById("endCall");
const status = document.getElementById("callStatus");
const timerDisplay = document.getElementById("callTimer");

// Ringtone & vibration
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;
function vibrateOnce() {
  if ("vibrate" in navigator) navigator.vibrate(300);
}

// === Start Local Mic ===
async function startLocalStream() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return localStream;
}

// === Caller Creates Offer ===
callBtn.onclick = async () => {
  vibrateOnce();
  peerConnection = new RTCPeerConnection(config);
  localStream = await startLocalStream();
  peerConnection.addTrack(localStream.getTracks()[0], localStream);

  // Remote audio playback
  peerConnection.ontrack = (event) => {
    remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };

  dataChannel = peerConnection.createDataChannel("chat");

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  status.innerText = "Offer created. Send this to your friend:";
  signalBox.value = JSON.stringify(offer);
};

// === Receiver Answers Offer ===
answerBtn.onclick = async () => {
  vibrateOnce();
  const offer = JSON.parse(signalInput.value.trim());
  peerConnection = new RTCPeerConnection(config);
  localStream = await startLocalStream();
  peerConnection.addTrack(localStream.getTracks()[0], localStream);

  peerConnection.ondatachannel = (event) => {
    dataChannel = event.channel;
  };

  peerConnection.ontrack = (event) => {
    remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };

  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  status.innerText = "Answer created. Send this back to caller:";
  signalBox.value = JSON.stringify(answer);
};

// === Caller Pastes Answer ===
document.getElementById("applyAnswer").onclick = async () => {
  const answer = JSON.parse(signalInput.value.trim());
  await peerConnection.setRemoteDescription(answer);
  status.innerText = "✅ Call Connected!";
  startCallTimer();
};

// === End Call ===
endBtn.onclick = () => {
  if (peerConnection) peerConnection.close();
  if (localStream) localStream.getTracks().forEach((t) => t.stop());
  peerConnection = null;
  stopCallTimer();
  ringtone.pause();
  ringtone.currentTime = 0;
  vibrateOnce();
  status.innerText = "Call Ended";
};

// === Timer ===
function startCallTimer() {
  callStartTime = new Date();
  callTimer = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - callStartTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    timerDisplay.innerText = `${minutes}:${seconds}`;
  }, 1000);
}
function stopCallTimer() {
  clearInterval(callTimer);
  timerDisplay.innerText = "";
}
