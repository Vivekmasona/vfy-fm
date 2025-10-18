// === FRONTEND-ONLY VOICE CALL (no server) ===
import "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";

let peer, call, localStream;
let callTimer, callStartTime;

// === Config ===
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;

// === Helper Functions ===
function vibrateOnce() {
  if ("vibrate" in navigator) navigator.vibrate(300);
}

function startCallTimer() {
  callStartTime = new Date();
  callTimer = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - callStartTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const s = String(elapsed % 60).padStart(2, "0");
    document.getElementById("callTimer").innerText = `${m}:${s}`;
  }, 1000);
}

function stopCallTimer() {
  clearInterval(callTimer);
  document.getElementById("callTimer").innerText = "";
}

// === Create Room ===
document.getElementById("createBtn").onclick = () => {
  const roomID = document.getElementById("roomId").value;
  peer = new Peer(roomID, { host: "0.peerjs.com", port: 443, secure: true });

  peer.on("open", id => {
    document.getElementById("callStatus").innerText = `Room Created ✅ (${id})`;
  });

  // Incoming Call
  peer.on("call", async incomingCall => {
    document.getElementById("callStatus").innerText = "Incoming Call...";
    document.getElementById("incomingCall").style.display = "block";
    ringtone.play();
    vibrateOnce();

    document.getElementById("acceptCall").onclick = async () => {
      ringtone.pause();
      ringtone.currentTime = 0;
      vibrateOnce();

      localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      incomingCall.answer(localStream);
      call = incomingCall;

      call.on("stream", stream => {
        document.getElementById("remoteAudio").srcObject = stream;
      });

      document.getElementById("incomingCall").style.display = "none";
      document.getElementById("callStatus").innerText = "Connected ✅";
      document.getElementById("endCall").style.display = "inline";
      startCallTimer();
    };

    document.getElementById("rejectCall").onclick = () => {
      ringtone.pause();
      ringtone.currentTime = 0;
      vibrateOnce();
      document.getElementById("incomingCall").style.display = "none";
      document.getElementById("callStatus").innerText = "Call Rejected ❌";
    };
  });
};

// === Join Room ===
document.getElementById("joinBtn").onclick = async () => {
  const roomID = document.getElementById("roomId").value;
  peer = new Peer(null, { host: "0.peerjs.com", port: 443, secure: true });

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const callConn = peer.call(roomID, localStream);
  call = callConn;

  document.getElementById("callStatus").innerText = "Calling...";
  vibrateOnce();

  callConn.on("stream", stream => {
    document.getElementById("remoteAudio").srcObject = stream;
    document.getElementById("callStatus").innerText = "Connected ✅";
    document.getElementById("endCall").style.display = "inline";
    startCallTimer();
  });
};

// === End Call ===
document.getElementById("endCall").onclick = () => {
  if (call) call.close();
  if (localStream) localStream.getTracks().forEach(t => t.stop());
  call = null;
  document.getElementById("callStatus").innerText = "Call Ended ☎️";
  document.getElementById("endCall").style.display = "none";
  stopCallTimer();
  vibrateOnce();
};
