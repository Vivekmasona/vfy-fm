// === Pure Frontend 2-Device Audio Call ===
// using BroadcastChannel for signaling (no server)

const channel = new BroadcastChannel("vfy_call_channel");
const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

let peerConnection;
let localStream;
let remoteAudio;
let callTimer;
let callStartTime;
let isCaller = false;

// Elements
const callBtn = document.getElementById("callUser");
const acceptBtn = document.getElementById("acceptCall");
const rejectBtn = document.getElementById("rejectCall");
const endBtn = document.getElementById("endCall");
const statusEl = document.getElementById("callStatus");
const timerEl = document.getElementById("callTimer");
const incomingBox = document.getElementById("incomingCall");

// Ringtone setup
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;
function vibrateOnce() {
  if ("vibrate" in navigator) navigator.vibrate(300);
}

// === Initialize Local Stream ===
async function startLocalStream() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return localStream;
}

// === Start Call (send offer) ===
callBtn.onclick = async () => {
  vibrateOnce();
  isCaller = true;
  peerConnection = new RTCPeerConnection(config);
  localStream = await startLocalStream();
  peerConnection.addTrack(localStream.getTracks()[0], localStream);

  peerConnection.ontrack = (event) => {
    remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      channel.postMessage({ type: "candidate", candidate: event.candidate });
    }
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  channel.postMessage({ type: "offer", offer });
  statusEl.innerText = "📞 Calling...";
};

// === Handle Broadcast Messages ===
channel.onmessage = async (event) => {
  const { type, offer, answer, candidate } = event.data;

  if (type === "offer" && !isCaller) {
    // Incoming call
    ringtone.play();
    incomingBox.style.display = "block";
    statusEl.innerText = "Incoming Call...";
    window.pendingOffer = offer;
  }

  if (type === "answer" && isCaller) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    statusEl.innerText = "✅ Connected!";
    startCallTimer();
  }

  if (type === "candidate" && peerConnection) {
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("ICE add error:", err);
    }
  }
};

// === Accept Call ===
acceptBtn.onclick = async () => {
  ringtone.pause();
  ringtone.currentTime = 0;
  vibrateOnce();
  incomingBox.style.display = "none";
  statusEl.innerText = "Connecting...";

  peerConnection = new RTCPeerConnection(config);
  localStream = await startLocalStream();
  peerConnection.addTrack(localStream.getTracks()[0], localStream);

  peerConnection.ontrack = (event) => {
    remoteAudio = new Audio();
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.play();
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      channel.postMessage({ type: "candidate", candidate: event.candidate });
    }
  };

  await peerConnection.setRemoteDescription(new RTCSessionDescription(window.pendingOffer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  channel.postMessage({ type: "answer", answer });

  statusEl.innerText = "✅ Connected!";
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
  statusEl.innerText = "❌ Call Rejected";
};

// === End Call ===
endBtn.onclick = () => {
  if (peerConnection) peerConnection.close();
  if (localStream) localStream.getTracks().forEach((t) => t.stop());
  peerConnection = null;
  stopCallTimer();
  statusEl.innerText = "Call Ended";
  endBtn.style.display = "none";
  vibrateOnce();
  channel.postMessage({ type: "end" });
};

// === End from other side ===
channel.onmessage = (event) => {
  if (event.data.type === "end") {
    if (peerConnection) peerConnection.close();
    if (localStream) localStream.getTracks().forEach((t) => t.stop());
    stopCallTimer();
    statusEl.innerText = "Call Ended by Other Side";
    endBtn.style.display = "none";
    ringtone.pause();
  }
};

// === Call Timer ===
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
