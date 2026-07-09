let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;
let wavePhase = 0;

// ऑप्टिमाइज़ेशन: फ़ंक्शन को मुख्य लूप से बाहर निकाला ताकि मेमोरी बार-बार न भरे
function drawFluidWave(ctx, centerX, centerY, imgRadius, points, depth, color, phaseOffset, bass, mid, wavePhase) {
  ctx.save();
  
  // नियॉन ग्लो (इसे बहुत ज़्यादा न बढ़ाएं ताकि परफॉर्मेंस न गिरे)
  ctx.shadowBlur = 15; 
  ctx.shadowColor = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  
  for (let i = 0; i <= points; i++) {
    let angle = (i / points) * Math.PI * 2;
    let audioInfluence = (i < points / 2) ? bass : mid;
    
    let waveHeight = Math.sin(angle * 4 + wavePhase + phaseOffset) * 
                     Math.cos(angle * 2 - wavePhase * 0.5) * 
                     (depth + (audioInfluence / 255) * 35);

    let r = imgRadius + 15 + waveHeight;
    
    let x = centerX + Math.cos(angle) * r;
    let y = centerY + Math.sin(angle) * r;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function initNeonFluidVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const imgRadius = 180; 

  audio.crossOrigin = "anonymous";

  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.82; // स्मूथ और रिस्पॉन्सिव का सही बैलेंस
      analyser.fftSize = 256; // 512 से बदलकर 256 किया ताकि कैलकुलेशन फ़ास्ट हो
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.error("AudioContext error:", e);
      useFallback = true;
    }
  }

  canvas.classList.add('wave-active');

  function draw() {
    if ((audio.paused || audio.ended) && !isLoading) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ==========================================
    // केस 1: लोडिंग स्टेट
    // ==========================================
    if (isLoading) {
      thumbBorder.style.transform = "scale(1)"; 
      loadingAngle += 0.06; 
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(loadingAngle);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f5ff';
      
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, 0, Math.PI * 0.8);
      ctx.strokeStyle = '#00f5ff';
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, Math.PI, Math.PI * 1.8);
      ctx.strokeStyle = '#ff00ac';
      ctx.stroke();
      
      ctx.restore();
      return; 
    }

    // ==========================================
    // केस 2: प्लेइंग स्टेट
    // ==========================================
    let bass = 0;
    let mid = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      bass = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
      mid = (dataArray[8] + dataArray[9] + dataArray[10] + dataArray[11]) / 4;
    } else {
      let curTime = audio.currentTime;
      bass = (Math.sin(curTime * 8) + 1) * 60;
      mid = (Math.cos(curTime * 6) + 1) * 40;
    }

    // इमेज पंप इफेक्ट को थोड़ा और स्मूथ (0.08) किया
    if (bass > 100) {
      const scaleFactor = 1 + (bass / 255) * 0.08; 
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }

    wavePhase += 0.025; // तैरने की गति थोड़ी बढ़ाई ताकि फ्लुइडिटी दिखे

    // बाहरी वेव (सियान)
    drawFluidWave(ctx, centerX, centerY, imgRadius, 90, 10, '#00f5ff', 0, bass, mid, wavePhase); 
    
    // अंदरूनी वेव (पिंक)
    drawFluidWave(ctx, centerX, centerY, imgRadius, 70, 15, '#ff00ac', Math.PI, bass, mid, wavePhase);
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
}

// इवेंट लिस्नर्स वैसे ही रहेंगे...

