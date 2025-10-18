// ===== FRONTEND-ONLY WORKING WEBRTC CALL (manual SDP copy-paste) =====

// globals (keeps same variable names/IDs style)
let localStream;
let peerConnection;
let callTimer;
let callStartTime;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// ringtone + vibrate
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;
function vibrateOnce(){ if ("vibrate" in navigator) navigator.vibrate(200); }

// small helper: update status element safely
function setStatus(text){ const el = document.getElementById('callStatus'); if(el) el.innerText = text; }

// wait for ICE gathering to complete (or timeout)
function waitForIceGathering(pc, timeout = 5000){
  return new Promise((resolve) => {
    if (!pc) return resolve();
    if (pc.iceGatheringState === 'complete') return resolve();
    function check(){ if (pc.iceGatheringState === 'complete'){ pc.removeEventListener('icegatheringstatechange', check); resolve(); } }
    pc.addEventListener('icegatheringstatechange', check);
    setTimeout(() => resolve(), timeout);
  });
}

// create peer connection and attach local stream
async function createPeerAndAddLocalStream(){
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(err=>{
    console.error("getUserMedia failed:", err);
    alert("Microphone access denied or unavailable.");
    throw err;
  });
  peerConnection = new RTCPeerConnection(config);

  // play remote audio on track
  peerConnection.ontrack = (ev) => {
    const remoteAudio = document.getElementById('remoteAudio') || new Audio();
    remoteAudio.srcObject = ev.streams[0];
    remoteAudio.autoplay = true;
    try { remoteAudio.play(); } catch(e){/* play might be blocked until user gesture */ }
  };

  // add local audio track
  if (localStream && localStream.getTracks().length > 0) {
    peerConnection.addTrack(localStream.getTracks()[0], localStream);
  }

  // ICE candidate logging (we will share full SDP after gathering)
  peerConnection.onicecandidate = (event) => {
    // no-op: we wait for iceGathering complete to copy full SDP
    // console.log("ice candidate:", event.candidate);
  };

  peerConnection.onconnectionstatechange = () => {
    console.log("PC state:", peerConnection.connectionState);
    setStatus("Connection: " + peerConnection.connectionState);
    if (peerConnection.connectionState === "connected") startCallTimer();
    if (peerConnection.connectionState === "disconnected" || peerConnection.connectionState === "failed" || peerConnection.connectionState === "closed"){
      stopCallTimer();
    }
  };

  return peerConnection;
}

// ===== when user clicks Call (create offer) =====
document.getElementById('callUser')?.addEventListener('click', async () => {
  try {
    setStatus('Creating offer...');
    vibrateOnce();

    // build PC and local stream
    await createPeerAndAddLocalStream();

    // create data channel optionally (not required for audio)
    try { peerConnection.createDataChannel("vfy-signal"); } catch(e){}

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // wait until ICE complete (so SDP has ICE candidates)
    await waitForIceGathering(peerConnection, 5000);

    // full local description (offer + ICE)
    const fullOffer = peerConnection.localDescription;
    const offerText = JSON.stringify(fullOffer);

    // copy to clipboard for easy share
    try {
      await navigator.clipboard.writeText(offerText);
      setStatus('Offer created & copied to clipboard. Send to callee.');
      alert('Offer copied to clipboard — send this text (via WhatsApp/Message) to the other user.');
    } catch (err) {
      // fallback: show prompt with text
      setStatus('Offer created. (copy manually)');
      alert('Could not copy to clipboard automatically. Use this dialog to copy the offer:\n\n' + offerText);
    }
  } catch (err) {
    console.error("Call(create offer) error:", err);
    setStatus('Error creating offer');
  }
});

// ===== Accept incoming offer (paste offer into prompt) =====
// This uses the same ID acceptCall as your UI. When user clicks Accept, prompt to paste the OFFER JSON string.
document.getElementById('acceptCall')?.addEventListener('click', async () => {
  try {
    const offerText = prompt("Paste the OFFER JSON you received from caller:");
    if (!offerText) return;
    vibrateOnce();
    setStatus('Accepting incoming offer...');
    ringtone.pause(); ringtone.currentTime = 0;

    // create pc and add local stream
    await createPeerAndAddLocalStream();

    // handle remote datachannel if any
    peerConnection.ondatachannel = (ev) => {
      ev.channel.onmessage = (m) => console.log("Data channel message:", m.data);
    };

    // set remote (offer)
    const remoteDesc = JSON.parse(offerText);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(remoteDesc));

    // create answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // wait for ICE gathering, then copy answer to clipboard
    await waitForIceGathering(peerConnection, 5000);
    const fullAnswer = peerConnection.localDescription;
    const answerText = JSON.stringify(fullAnswer);
    try {
      await navigator.clipboard.writeText(answerText);
      setStatus('Answer created & copied. Send back to caller.');
      alert('Answer copied to clipboard — send this back to caller.');
    } catch (err) {
      setStatus('Answer created. Copy it manually from the dialog.');
      alert('Could not copy automatically. Use this dialog to copy answer:\n\n' + answerText);
    }

    // show connected when remote sets answer
  } catch (err) {
    console.error("Accept offer error:", err);
    setStatus('Error accepting offer');
  }
});

// ===== Provide function to paste ANSWER on caller side =====
// We will map this to rejectCall button (since your UI had rejectCall). Clicking it will prompt to paste ANSWER.
// NOTE: keep ID names same but behavior is to paste answer.
document.getElementById('rejectCall')?.addEventListener('click', async () => {
  try {
    const answerText = prompt("Paste ANSWER JSON you received from callee:");
    if (!answerText) return;
    setStatus('Applying remote answer...');
    await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(answerText)));
    setStatus('Connected (answer applied)');
    vibrateOnce();
  } catch (err) {
    console.error("Apply answer error:", err);
    setStatus('Error applying answer');
  }
});

// ===== End Call (same ID endCall) =====
document.getElementById('endCall')?.addEventListener('click', () => {
  endCall();
  vibrateOnce();
});

function endCall(){
  try {
    if (peerConnection) {
      peerConnection.close();
      peerConnection = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
      localStream = null;
    }
  } catch(e){ console.warn(e); }
  setStatus('');
  // hide incoming UI if present
  const incoming = document.getElementById('incomingCall');
  if (incoming) incoming.style.display = 'none';
  stopCallTimer();
}

// ===== Ringtone control for demonstration (optional) =====
// Show incoming-call UI if user wants to simulate receiving an offer by pasting it into a special prompt
// But we use Accept flow above which prompts for an offer

// ===== Call timer functions =====
function startCallTimer(){
  callStartTime = new Date();
  const el = document.getElementById('callTimer');
  if (!el) return;
  callTimer = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - callStartTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2,'0');
    const s = String(elapsed % 60).padStart(2,'0');
    el.innerText = `${m}:${s}`;
  }, 1000);
}
function stopCallTimer(){
  clearInterval(callTimer);
  const el = document.getElementById('callTimer');
  if (el) el.innerText = '';
}

// ===== Optional: show incoming-call prompt (if you want to simulate incoming without socket) =====
/*
  If you want a quick way to display incoming-call popup and play ringtone (so that Accept button becomes meaningful),
  call showIncomingPopup() from console or a test button:
*/
function showIncomingPopup(){
  const inc = document.getElementById('incomingCall');
  if (inc) inc.style.display = 'block';
  setStatus('Incoming Call...');
  ringtone.play().catch(()=>{ /* autoplay lock */ });
  vibrateOnce();
}
// expose for testing
window.showIncomingPopup = showIncomingPopup;
