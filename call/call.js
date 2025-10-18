// === Pure Frontend PeerJS Call System (no backend) ===

const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;

let peer, conn, localStream, currentCall;
let callStartTime, callTimer;

// Vibrate once function
function vibrateOnce() {
  if ("vibrate" in navigator) navigator.vibrate(300);
}

// Auto join or create Peer
window.addEventListener("load", () => {
  let roomID = localStorage.getItem("sessionId");
  if (!roomID) {
    roomID = prompt("Enter or create your VFY ID:");
    if (roomID) localStorage.setItem("sessionId", roomID);
  }

  if (roomID) {
    initPeer(roomID);
    alert(`Connected ✅ ID: ${roomID}`);
  } else {
    alert("❌ No Session ID found!");
  }
});

function initPeer(id) {
  peer = new Peer(id, { host: "0.peerjs.com", port: 443, secure: true });

  peer.on("open", () => {
    console.log("Peer connected:", id);
    document.getElementById("callUser").disabled = false;
  });

  peer.on("connection", c => {
    conn = c;
    conn.on("data", msg => console.log("Message:", msg));
  });

  // Incoming call
  peer.on("call", call => {
    ringtone.play();
    vibrateOnce();
    showIncomingPopup(call);
  });
}

// Call User
document.getElementById("callUser").addEventListener("click", async () => {
  const targetId = prompt("Enter friend’s VFY ID to call:");
  if (!targetId) return;

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const call = peer.call(targetId, localStream);

  document.getElementById("callStatus").innerText = "Calling...";
  vibrateOnce();

  call.on("stream", remoteStream => {
    const audio = new Audio();
    audio.srcObject = remoteStream;
    audio.play();
    startCallTimer();
    document.getElementById("callStatus").innerText = "Connected ✅";
    document.getElementById("endCall").style.display = "inline";
  });

  call.on("close", () => endCall());
  currentCall = call;
});

// Incoming call popup
function showIncomingPopup(call) {
  const popup = document.getElementById("incomingCall");
  popup.style.display = "block";
  document.getElementById("callStatus").innerText = "Incoming Call...";
  document.getElementById("acceptCall").style.display = "inline";
  document.getElementById("rejectCall").style.display = "inline";
  document.getElementById("endCall").style.display = "none";

  document.getElementById("acceptCall").onclick = async () => {
    ringtone.pause();
    ringtone.currentTime = 0;
    vibrateOnce();
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    call.answer(localStream);

    call.on("stream", remoteStream => {
      const audio = new Audio();
      audio.srcObject = remoteStream;
      audio.play();
      document.getElementById("callStatus").innerText = "Connected ✅";
      document.getElementById("endCall").style.display = "inline";
      document.getElementById("callTimer").style.display = "inline";
      startCallTimer();
    });

    popup.style.display = "none";
    currentCall = call;
  };

  document.getElementById("rejectCall").onclick = () => {
    ringtone.pause();
    ringtone.currentTime = 0;
    vibrateOnce();
    call.close();
    popup.style.display = "none";
    document.getElementById("callStatus").innerText = "Call Rejected ❌";
  };
}

// End Call
document.getElementById("endCall").addEventListener("click", () => {
  if (currentCall) currentCall.close();
  endCall();
  vibrateOnce();
});

// Timer functions
function startCallTimer() {
  callStartTime = new Date();
  callTimer = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - callStartTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    document.getElementById("callTimer").innerText = `${m}:${s}`;
  }, 1000);
}

function stopCallTimer() {
  clearInterval(callTimer);
  document.getElementById("callTimer").innerText = "";
}

function endCall() {
  if (localStream) localStream.getTracks().forEach(t => t.stop());
  stopCallTimer();
  document.getElementById("callStatus").innerText = "";
  document.getElementById("endCall").style.display = "none";
  document.getElementById("incomingCall").style.display = "none";
}
