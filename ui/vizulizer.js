
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
  
  // परफॉर्मेंस बूस्ट: कैनवास का साइज आधा (300x300) कर दिया, 
  // लेकिन CSS से इसे बड़ा दिखाएंगे। इससे पिक्सेल कैलकुलेशन 4 गुना कम हो जाएगी!
  canvas.width = 300;
  canvas.height = 300;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const imgRadius = 90; // साइज आधा किया

  audio.crossOrigin = "anonymous";

  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.85; // और ज्यादा स्मूथ मूवमेंट्स के लिए
      analyser.fftSize = 128; // FFT साइज आधा किया (प्रोसेसिंग लोड घटाने के लिए)
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
      ctx.lineWidth = 3;
      
      ctx.strokeStyle = '#00f5ff';
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 5, 0, Math.PI * 0.8);
      ctx.stroke();
      
      ctx.strokeStyle = '#ff00ac';
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 5, Math.PI, Math.PI * 1.8);
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
      bass = (dataArray[0] + dataArray[1]) / 2;
      mid = (dataArray[3] + dataArray[4]) / 2;
    } else {
      let curTime = audio.currentTime;
      bass = (Math.sin(curTime * 8) + 1) * 70;
      mid = (Math.cos(curTime * 6) + 1) * 50;
    }

    // थंबनेल पंपिंग
    let targetScale = 1 + (bass / 255) * 0.12; 
    currentScale += (targetScale - currentScale) * 0.3; 
    thumbBorder.style.transform = `scale(${currentScale})`;

    wavePhase += 0.03; 

    // सुपर लाइटवेट ड्रॉइंग फंक्शन (नो ब्लर, नो ग्रेडिएंट इन जावास्क्रिप्ट)
    function drawFluidBlob(points, baseDepth, color, phaseOffset, audioVal) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      
      for (let i = 0; i <= points; i++) {
        let angle = (i / points) * Math.PI * 2;
        let blobMovement = Math.sin(angle * 1.5 + wavePhase + phaseOffset) * 
                           Math.cos(angle * 1.2 - wavePhase) * 
                           (baseDepth + (audioVal / 255) * 45);

        let r = imgRadius + 10 + blobMovement;
        let x = centerX + Math.cos(angle) * r;
        let y = centerY + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill(); 
      ctx.restore();
    }

    // पॉइंट्स की संख्या और कम कर दी (सिर्फ 16 और 14 पॉइंट्स!)
    // 1. लेफ्ट साइड (ब्लू)
    drawFluidBlob(16, 10, 'rgba(0, 110, 255, 0.8)', 0, mid); 
    
    // 2. राइट साइड (ऑरेंज)
    drawFluidBlob(14, 12, 'rgba(255, 136, 0, 0.85)', Math.PI, bass);
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
}

// बाकी का इवेंट लिस्नर कोड बिल्कुल पहले जैसा ही रहेगा...
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
  audio.addEventListener('error', () => { useFallback = true; stopLoading(); });
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
