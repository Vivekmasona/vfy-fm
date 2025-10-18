import "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";

let peer, call, localStream;
let callTimer, callStartTime;
const config = { host: "0.peerjs.com", port: 443, secure: true };
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;

function vibrateOnce() {
  if ("vibrate" in navigator) navigator.vibrate(300);
}

function startCallTimer() {
  callStartTime = new Date();
  callTimer = setInterval(() => {
    const elapsed = Math.floor((new Date() - callStartTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const s = String(elapsed % 60).padStart(2, "0");
    document.getElementById("callTimer").innerText = `${m}:${s}`;
  }, 1000);
}

function stopCallTimer() {
  clearInterval(callTimer);
  document.getElementById("callTimer").innerText = "";
}

// === Auto load ===
window.addEventListener("load", () => {
  let roomID = localStorage.getItem("sessionId");
  if (!roomID) {
    roomID = "vfy-" + Math.random().toString(36).substring(2, 8);
    localStorage.setItem("sessionId", roomID);
  }
  document.getElementById("roomId").value = roomID;
  document.getElementById("callStatus").innerText = `Your VFY ID: ${roomID}`;
});

// === Create Room ===
document.getElementById("createBtn").onclick = () => {
  const roomID = document.getElementById("roomId").value;
  peer = new Peer(roomID, config);

  peer.on("open", id => {
    document.getElementById("callStatus").innerText = `Room Active ✅ (${id})`;
  });

  peer.on("call", async incomingCall => {
    document.getElementById("callStatus").innerText = "📞 Incoming Call...";
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
  peer = new Peer(null, config);
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
