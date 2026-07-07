
let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;

function initNeonCircularVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border');
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  // कैनवास साइजिंग और रेडियस एडजस्टमेंट (ताकि बार्स इमेज के बाहर रहें)
  canvas.width = 540;
  canvas.height = 540;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const baseRadius = 168; // 1000246980.jpg की प्रॉब्लम सॉल्व करने के लिए परफेक्ट रेडियस

  audio.crossOrigin = "anonymous";

  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.75; // बीट्स को ज्यादा तेज़ और रिस्पॉन्सिव रखने के लिए
      analyser.fftSize = 256; 
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      useFallback = true;
    }
  }

  canvas.classList.add('wave-active');

  // लूप से बाहर स्मूथ ग्लोबल ग्रेडिएंट
  let globalGradient = ctx.createRadialGradient(centerX, centerY, baseRadius, centerX, centerY, baseRadius + 70);
  globalGradient.addColorStop(0, '#00f5ff');   // अंदर सियान
  globalGradient.addColorStop(0.5, '#3b82f6'); // बीच में ब्लू
  globalGradient.addColorStop(1, '#ff00ac');   // बाहर हॉट पिंक

  function drawSpectrum() {
    if (audio.paused || audio.ended) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(drawSpectrum);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalBars = 76; // परफेक्ट डेंसिटी
    let bassSum = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      // शुरुआती लो-फ्रीक्वेंसी को टारगेट किया ताकि सिर्फ बास/किक पर ही ज़ूम हो
      bassSum = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    } else {
      let curTime = audio.currentTime;
      let rawBeat = Math.sin(curTime * 9.8) * Math.cos(curTime * 4.3) * Math.sin(Date.now() * 0.015);
      if (rawBeat > 0.20) bassSum = ((rawBeat - 0.20) / 0.80) * 220;
    }

    // ==========================================
    // एकदम तगड़ा ज़ूम फील बीट पंप (Extreme Zoom)
    // ==========================================
    if (bassSum > 40) {
      const norm = bassSum / 255;
      const scaleFactor = 1 + (norm * 0.25); // 1.25x तक का ज़बर्दस्त ज़ूम झटका
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }

    ctx.strokeStyle = globalGradient;
    ctx.lineCap = 'round';

    // ==========================================
    // बार्स रेंडरिंग (इमेज के बॉर्डर से बाहर की तरफ)
    // ==========================================
    for (let i = 0; i < totalBars; i++) {
      let angle = (i / totalBars) * Math.PI * 2;
      let audioIndex = Math.floor((i / totalBars) * (dataArray ? dataArray.length * 0.55 : 1));
      
      let rawValue = 0;
      if (!useFallback && analyser) {
        rawValue = dataArray[audioIndex];
      } else {
        let curTime = audio.currentTime;
        rawValue = (Math.sin(curTime * 5 + i * 0.4) * Math.cos(curTime * 2 + i * 0.2) + 1) * 75;
      }

      // बार्स की लंबाई (मैक्सिमम 60px)
      let barLength = (rawValue / 255) * 60;
      if (rawValue < 8) barLength = 2; // बेस डॉट

      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);

      // बार्स अब सीधे baseRadius (168px) से शुरू होकर बाहर की तरफ भागेंगी
      let startX = centerX + cosA * baseRadius;
      let startY = centerY + sinA * baseRadius;
      let endX = centerX + cosA * (baseRadius + barLength);
      let endY = centerY + sinA * (baseRadius + barLength);

      // ऑप्टिमाइज्ड फेक नियॉन ग्लो इफ़ेक्ट
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      
      ctx.lineWidth = 7.5; 
      ctx.globalAlpha = 0.22; 
      ctx.stroke();

      // तीखी कोर बार्स
      ctx.globalAlpha = 1.0; 
      ctx.lineWidth = 3.5; 
      ctx.stroke();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  drawSpectrum();
}

// प्लेयर इवेंट्स लिस्नर्स
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;

  audio.addEventListener('playing', initNeonCircularVisualizer);
  audio.addEventListener('error', () => { useFallback = true; });

  const stopEvents = ['pause', 'ended', 'waiting'];
  stopEvents.forEach(evt => {
    audio.addEventListener(evt, () => {
      const canvas = document.getElementById('fluid-wave-visualizer');
      const thumbBorder = document.querySelector('.thumbnail-border');
      if (canvas) {
        canvas.classList.remove('wave-active');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (thumbBorder) thumbBorder.style.transform = "scale(1)";
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
  });
});

