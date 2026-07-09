let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;
let wavePhase = 0;

let currentScale = 1;

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

      analyser.smoothingTimeConstant = 0.82; 
      analyser.fftSize = 256; 
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.error("AudioContext error, using fallback:", e);
      useFallback = true;
    }
  }

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
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
      loadingAngle += 0.08; 
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(loadingAngle);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      
      // हैवी shadowBlur हटाकर सिंपल ग्लो दिया है
      ctx.strokeStyle = '#00f5ff';
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, 0, Math.PI * 0.8);
      ctx.stroke();
      
      ctx.strokeStyle = '#ff00ac';
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, Math.PI, Math.PI * 1.8);
      ctx.stroke();
      
      ctx.restore();
      return; 
    }

    // ==========================================
    // केस 2: प्लेइंग स्टेट (Optimized Fluid Blob)
    // ==========================================
    let bass = 0;
    let mid = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      bass = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
      mid = (dataArray[6] + dataArray[7] + dataArray[8] + dataArray[9]) / 4;
    } else {
      let curTime = audio.currentTime;
      bass = (Math.sin(curTime * 8) + 1) * 70;
      mid = (Math.cos(curTime * 6) + 1) * 50;
    }

    let targetScale = 1 + (bass / 255) * 0.14; 
    currentScale += (targetScale - currentScale) * 0.25; 
    thumbBorder.style.transform = `scale(${currentScale})`;

    wavePhase += 0.025; 

    // OPTIMIZED: ब्लर फ़िल्टर की जगह 'Radial Gradient' का इस्तेमाल
    function drawFluidBlob(points, baseDepth, colorStart, colorEnd, phaseOffset, audioVal) {
      ctx.save();
      
      // भारी कंपोजिट और ब्लर हटा दिया गया है
      ctx.beginPath();
      
      let maxRadius = 0;
      let pointsArray = [];

      for (let i = 0; i <= points; i++) {
        let angle = (i / points) * Math.PI * 2;
        let blobMovement = Math.sin(angle * 2 + wavePhase + phaseOffset) * 
                           Math.cos(angle * 1.5 - wavePhase) * 
                           (baseDepth + (audioVal / 255) * 85);

        let r = imgRadius + 20 + blobMovement;
        if (r > maxRadius) maxRadius = r; // ग्रेडिएंट साइज के लिए ट्रैक करना

        let x = centerX + Math.cos(angle) * r;
        let y = centerY + Math.sin(angle) * r;

        pointsArray.push({x, y});
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // यहाँ जादू है: यह बिना लैग के सॉफ्ट धुएँ जैसा (Fluid Neon) इफ़ेक्ट देगा
      let gradient = ctx.createRadialGradient(centerX, centerY, imgRadius - 20, centerX, centerY, maxRadius);
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(0.4, colorStart);
      gradient.addColorStop(1, colorEnd); // बाहर जाते ही ट्रांसपेरेंट (0 ओपेसिटी) हो जाएगा

      ctx.fillStyle = gradient;
      ctx.fill(); 
      ctx.restore();
    }

    // 1. लेफ्ट साइड: ब्लू फ्लूइड लेयर (सॉफ्ट ट्रांसपेरेंट एंडिंग के साथ)
    drawFluidBlob(30, 20, 'rgba(0, 110, 255, 0.8)', 'rgba(0, 110, 255, 0)', 0, mid); 
    
    // 2. राइट साइड: नियॉन ऑरेंज फ्लूइड लेयर
    drawFluidBlob(25, 25, 'rgba(255, 136, 0, 0.85)', 'rgba(255, 136, 0, 0)', Math.PI, bass);
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
}

// बाकी का इवेंट लिस्नर कोड बिल्कुल सेम रहेगा...
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;

  const startLoading = () => { if (!isLoading) { isLoading = true; initNeonFluidVisualizer(); } };
  const stopLoading = () => { isLoading = false; };

  audio.addEventListener('loadstart', startLoading);
  audio.addEventListener('waiting', startLoading);
  audio.addEventListener('playing', () => { stopLoading(); initNeonFluidVisualizer(); });
  audio.addEventListener('canplaythrough', stopLoading);
  audio.addEventListener('seeking', startLoading);
  audio.addEventListener('seeked', stopLoading);
  audio.addEventListener('error', () => { console.error("Audio error"); useFallback = true; stopLoading(); });

  const stopEvents = ['pause', 'ended'];
  stopEvents.forEach(evt => {
    audio.addEventListener(evt, () => {
      isLoading = false;
      const canvas = document.getElementById('fluid-wave-visualizer');
      const thumbBorder = document.querySelector('.thumbnail-border');
      if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
      if (canvas) { canvas.classList.remove('wave-active'); const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); }
      if (thumbBorder) thumbBorder.style.transform = "scale(1)";
    });
  });
});
