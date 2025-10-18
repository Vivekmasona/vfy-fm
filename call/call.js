// === Pure Frontend WebRTC Audio Call ===
// No backend, no socket.io — same function names

let localStream;
let peerConnection;
let remoteAudio;
let callTimer;
let callStartTime;
let localOffer;
let localAnswer;
let dataChannel;

// Google public STUN server
const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

// Elements from your HTML
const callBtn = document.getElementById("callUser");
const acceptBtn = document.getElementById("acceptCall");
const rejectBtn = document.getElementById("rejectCall");
const endBtn = document.getElementById("endCall");
const statusEl = document.getElementById("callStatus");
const timerEl = document.getElementById("callTimer");
const incomingBox = document.getElementById("incomingCall");

// Ringtone sound
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;

// Vibrate function
function vibrateOnce() {
  if ("vibrate" in navigator) navigator.vibrate(300);
}

// === Caller creates offer ===
callBtn.onclick = async () => {
  vibrateOnce();
  statusEl.innerText = "Ringing...";
  ringtone.play();

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  peerConnection = new RTCPeerConnection(config);
  peerConnection.addTrack(localStream.getTracks()[0], localStream);

  peerConnection.ontrack = (event) => {
    remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  localOffer = offer;

  // Show incoming call popup on same device (for demo)
  setTimeout(() => {
    ringtone.pause();
    ringtone.currentTime = 0;
    incomingBox.style.display = "block";
    statusEl.innerText = "Incoming Call...";
  }, 2000);
};

// === Accept Call ===
acceptBtn.onclick = async () => {
  ringtone.pause();
  ringtone.currentTime = 0;
  vibrateOnce();

  incomingBox.style.display = "none";
  statusEl.innerText = "Connecting...";

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const receiverPC = new RTCPeerConnection(config);
  receiverPC.addTrack(localStream.getTracks()[0], localStream);

  receiverPC.ontrack = (event) => {
    remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };

  await receiverPC.setRemoteDescription(localOffer);
  const answer = await receiverPC.createAnswer();
  await receiverPC.setLocalDescription(answer);

  // Apply answer to caller side
  await peerConnection.setRemoteDescription(answer);

  statusEl.innerText = "Connected ✅";
  endBtn.style.display = "inline";
  timerEl.style.display = "inline";
  startCallTimer();
};

// === Reject Call ===
rejectBtn.onclick = () => {
  ringtone.pause();
  ringtone.currentTime = 0;
  vibrateOnce();
  incomingBox.style.display = "none";
  statusEl.innerText = "Call Rejected ❌";
};

// === End Call ===
endBtn.onclick = () => {
  if (peerConnection) peerConnection.close();
  if (localStream) localStream.getTracks().forEach((t) => t.stop());
  peerConnection = null;
  statusEl.innerText = "Call Ended";
  endBtn.style.display = "none";
  stopCallTimer();
  vibrateOnce();
};

// === Timer ===
function startCallTimer() {
  callStartTime = new Date();
  callTimer = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - callStartTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    timerEl.innerText = `${minutes}:${seconds}`;
  }, 1000);
}
function stopCallTimer() {
  clearInterval(callTimer);
  timerEl.innerText = "";
}
