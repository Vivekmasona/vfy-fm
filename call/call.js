const socket = io("hhttps://vfycalll.onrender.com/");
//const socket = io("https://vfy-call.deno.dev/");

        let localStream;
        let peerConnection;
        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        let roomID;
        let callTimer;
        let callStartTime;

        // Ringtone for Incoming Call
        const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
        ringtone.loop = true;

        // Function to make the phone vibrate once
        function vibrateOnce() {
            if ("vibrate" in navigator) {
                navigator.vibrate(300); // Vibrate for 300ms
            }
        }

  // Automatically join room if sessionId is found in localStorage
        window.addEventListener('load', () => {
            roomID = localStorage.getItem('sessionId');
            if (roomID) {
                socket.emit('join-room', roomID);
                document.getElementById('callUser').disabled = false;
                alert(`Connection successful: ${roomID}`);
            } else {
                alert('Create VFY ID');
            }
        });
 

        // Call User
        document.getElementById('callUser').addEventListener('click', async () => {
            socket.emit('call-request', { roomID });
            document.getElementById('callStatus').innerText = 'Calling...';
            vibrateOnce(); // Vibrate when call is placed
        });

        // Incoming Call Popup
        socket.on('incoming-call', ({ from }) => {
            document.getElementById('incomingCall').style.display = 'block';
            document.getElementById('callTimer').style.display = 'none';
            document.getElementById('acceptCall').style.display = 'inline';
            document.getElementById('rejectCall').style.display = 'inline';
            document.getElementById('endCall').style.display = 'none';

            // Play ringtone
            ringtone.play();

            document.getElementById('callStatus').innerText = 'Incoming Call...';

            // Accept Call
            document.getElementById('acceptCall').onclick = async () => {
                ringtone.pause();
                ringtone.currentTime = 0;
                vibrateOnce(); // Vibrate when call is accepted
                socket.emit('call-accepted', { to: from });
                document.getElementById('incomingCall').style.display = 'none';
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
                document.getElementById('endCall').style.display = 'inline';
                document.getElementById('callTimer').style.display = 'inline';
                startCallTimer();
            };

            // Reject Call
            document.getElementById('rejectCall').onclick = () => {
                ringtone.pause();
                ringtone.currentTime = 0;
                vibrateOnce(); // Vibrate when call is rejected
                socket.emit('call-rejected', { to: from });
                document.getElementById('incomingCall').style.display = 'none';
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
            document.getElementById('endCall').style.display = 'inline';
            document.getElementById('callTimer').style.display = 'inline';
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
        document.getElementById('endCall').addEventListener('click', () => {
            socket.emit('end-call', roomID);
            endCall();
            vibrateOnce(); // Vibrate when call is ended
        });

        socket.on('call-ended', () => {
            endCall();
            vibrateOnce(); // Vibrate when call is ended
        });

        function endCall() {
            if (peerConnection) peerConnection.close();
            peerConnection = null;
            document.getElementById('callStatus').innerText = '';
            document.getElementById('endCall').style.display = 'none';
            document.getElementById('incomingCall').style.display = 'none';
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
                document.getElementById('callTimer').innerText = `${minutes}:${seconds}`;
            }, 1000);
        }

        function stopCallTimer() {
            clearInterval(callTimer);
            document.getElementById('callTimer').innerText = '';
        }
