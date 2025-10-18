
let localStream, remoteStream, pc, timerInterval;
const ringtone = new Audio("https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg");

async function startCall() {
  pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  remoteStream = new MediaStream();
  document.getElementById("localAudio").srcObject = localStream;
  document.getElementById("remoteAudio").srcObject = remoteStream;

  localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
  pc.ontrack = e => e.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));
  pc.onicecandidate = e => {
    if (e.candidate) return;
    document.getElementById("offer").value = JSON.stringify(pc.localDescription);
  };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  document.getElementById("status").innerText = "Offer created! Copy and send to receiver.";
}

async function receiveOffer() {
  pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  remoteStream = new MediaStream();
  document.getElementById("localAudio").srcObject = localStream;
  document.getElementById("remoteAudio").srcObject = remoteStream;

  localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
  pc.ontrack = e => e.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));
  pc.onicecandidate = e => {
    if (e.candidate) return;
    document.getElementById("answer").value = JSON.stringify(pc.localDescription);
  };

  const offer = JSON.parse(document.getElementById("offer").value);
  await pc.setRemoteDescription(offer);

  ringtone.loop = true;
  ringtone.play();

  document.getElementById("acceptBtn").style.display = "block";
}

async function acceptCall() {
  ringtone.pause();
  document.getElementById("acceptBtn").style.display = "none";

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  document.getElementById("answer").value = JSON.stringify(pc.localDescription);
  document.getElementById("status").innerText = "Answer created! Send to caller.";

  startTimer();
}

async function connectAnswer() {
  const answer = JSON.parse(document.getElementById("answer").value);
  await pc.setRemoteDescription(answer);
  document.getElementById("status").innerText = "Connected ✅";
  startTimer();
}

function startTimer() {
  const timer = document.getElementById("timer");
  let sec = 0;
  timer.innerText = "00:00";
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    sec++;
    let m = String(Math.floor(sec / 60)).padStart(2, "0");
    let s = String(sec % 60).padStart(2, "0");
    timer.innerText = `${m}:${s}`;
  }, 1000);
}

function endCall() {
  ringtone.pause();
  if (pc) pc.close();
  if (localStream) localStream.getTracks().forEach(t => t.stop());
  if (remoteStream) remoteStream.getTracks().forEach(t => t.stop());
  clearInterval(timerInterval);
  document.getElementById("status").innerText = "Call ended ❌";
  document.getElementById("timer").innerText = "00:00";
}
