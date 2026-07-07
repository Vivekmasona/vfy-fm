let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false; // लोडिंग स्टेट ट्रैक करने के लिए
let loadingAngle = 0;   // लोडर को घुमाने के लिए कोण

function initNeonCircularVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border');
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const baseRadius = 195; 

  audio.crossOrigin = "anonymous";

  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.70; 
      analyser.fftSize = 256; 
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      useFallback = true;
    }
  }

  canvas.classList.add('wave-active');

  let globalGradient = ctx.createRadialGradient(centerX, centerY, baseRadius, centerX, centerY, baseRadius + 75);
  globalGradient.addColorStop(0, '#00f5ff');   // सियान
  globalGradient.addColorStop(0.4, '#3b82f6'); // ब्लू
  globalGradient.addColorStop(1, '#ff00ac');   // लेज़र पिंक

  function drawSpectrum() {
    // अगर गाना पॉज़ है और लोड भी नहीं हो रहा, तो कैनवस साफ़ कर दो
    if ((audio.paused || audio.ended) && !isLoading) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(drawSpectrum);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ==========================================
    // केस 1: जब गाना लोड या बफर हो रहा हो (कैनवास लोडर)
    // ==========================================
    if (isLoading) {
      thumbBorder.style.transform = "scale(1)"; // लोडिंग के समय थंबनेल शांत रहेगा
      
      loadingAngle += 0.05; // घूमने की स्पीड
      
      ctx.save();
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      
      // नियॉन ग्लो इफ़ेक्ट लोडर के लिए
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ff0000';
      
      // एक सुंदर कट-आउट (अधूरा) घूमता हुआ सर्कल बनाना
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, loadingAngle, loadingAngle + (Math.PI * 1.5));
      ctx.strokeStyle = '#00f5ff';
      ctx.stroke();
      ctx.restore();
      
      return; // यहाँ से लौट जाएँ ताकि पीछे बार्स न बनें
    }

    // ==========================================
    // केस 2: जब गाना बज रहा हो (असली विजुअलाइज़र बार्स)
    // ==========================================
    const totalBars = 84; 
    let bassSum = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      bassSum = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    } else {
      let curTime = audio.currentTime;
      let rawBeat = Math.sin(curTime * 11) * Math.cos(curTime * 5) * Math.sin(Date.now() * 0.02);
      if (rawBeat > 0.15) bassSum = ((rawBeat - 0.15) / 0.85) * 240;
    }

    // महा-पंप ज़ूम इफेक्ट
    if (bassSum > 35) {
      const norm = bassSum / 255;
      const scaleFactor = 1 + (norm * 0.38); 
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }

    ctx.strokeStyle = globalGradient;
    ctx.lineCap = 'round';

    for (let i = 0; i < totalBars; i++) {
      let angle = (i / totalBars) * Math.PI * 2;
      let audioIndex = Math.floor((i / totalBars) * (dataArray ? dataArray.length * 0.50 : 1));
      
      let rawValue = 0;
      if (!useFallback && analyser) {
        rawValue = dataArray[audioIndex];
      } else {
        let curTime = audio.currentTime;
        rawValue = (Math.sin(curTime * 5 + i * 0.4) * Math.cos(curTime * 2 + i * 0.2) + 1) * 75;
      }

      let barLength = (rawValue / 255) * 65;
      if (rawValue < 6) barLength = 2; 

      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);

      let startX = centerX + cosA * baseRadius;
      let startY = centerY + sinA * baseRadius;
      let endX = centerX + cosA * (baseRadius + barLength);
      let endY = centerY + sinA * (baseRadius + barLength);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      
      ctx.lineWidth = 8.5; 
      ctx.globalAlpha = 0.25; 
      ctx.stroke();

      ctx.globalAlpha = 1.0; 
      ctx.lineWidth = 4.0; 
      ctx.stroke();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  drawSpectrum();
}

// लोडिंग स्टेट्स को कैप्चर करने के लिए इवेंट लिस्नर्स
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;

  // जैसे ही गाना लोड होना शुरू हो या बफ़रिंग करे
  const startLoading = () => {
    isLoading = true;
    initNeonCircularVisualizer();
  };

  // जैसे ही गाना प्ले होने के लिए तैयार हो जाए
  const stopLoading = () => {
    isLoading = false;
  };

  audio.addEventListener('loadstart', startLoading);
  audio.addEventListener('waiting', startLoading);
  
  audio.addEventListener('playing', () => {
    stopLoading();
    initNeonCircularVisualizer();
  });
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


