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
  
  // कैनवास साइज को बढ़ा दिया ताकि दूर तक जाने वाली बार्स कटें नहीं
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // =======================================================
  // यहाँ जादू है: इसे 168 से बढ़ाकर 195 कर दिया ताकि बार्स इमेज से काफी दूर रहें
  // =======================================================
  const baseRadius = 195; 

  audio.crossOrigin = "anonymous";

  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.70; // बार्स को और ज्यादा फुर्तीला (Snappy) बनाने के लिए
      analyser.fftSize = 256; 
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      useFallback = true;
    }
  }

  canvas.classList.add('wave-active');

  // नए रेडियस के हिसाब से चमकीला ग्रेडिएंट रेंज बढ़ा दिया
  let globalGradient = ctx.createRadialGradient(centerX, centerY, baseRadius, centerX, centerY, baseRadius + 75);
  globalGradient.addColorStop(0, '#00f5ff');   // अंदर प्योर नियॉन सियान
  globalGradient.addColorStop(0.4, '#3b82f6'); // बीच में डीप ब्लू
  globalGradient.addColorStop(1, '#ff00ac');   // बाहरी नोक पर लेज़र पिंक

  function drawSpectrum() {
    if (audio.paused || audio.ended) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(drawSpectrum);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalBars = 84; 
    let bassSum = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      // सिर्फ सबसे भारी बास फ्रीक्वेंसी (0 से 3) को लिया
      bassSum = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    } else {
      let curTime = audio.currentTime;
      let rawBeat = Math.sin(curTime * 11) * Math.cos(curTime * 5) * Math.sin(Date.now() * 0.02);
      if (rawBeat > 0.15) bassSum = ((rawBeat - 0.15) / 0.85) * 240;
    }

    // =======================================================
    // महा-पंप ज़ूम इफेक्ट (Hyper Bass Zoom Feel)
    // =======================================================
    if (bassSum > 35) {
      const norm = bassSum / 255;
      // स्केल फैक्टर को बढ़ाकर 0.38 कर दिया (यानी 1.38x तक का तगड़ा झटका)
      const scaleFactor = 1 + (norm * 0.38); 
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }

    ctx.strokeStyle = globalGradient;
    ctx.lineCap = 'round';

    // =======================================================
    // बार्स ड्राइंग - बिल्कुल साफ बॉर्डर एरिया से बाहर की तरफ
    // =======================================================
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

      // बार की लंबाई (मैक्सिमम 65px बाहर फेंकेगी)
      let barLength = (rawValue / 255) * 65;
      if (rawValue < 6) barLength = 2; // शांत होने पर सिर्फ नन्ही बिंदी दिखेगी

      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);

      // अब ये पॉइंट्स इमेज से काफी दूरी पर (195px रेडियस से) शुरू होंगे
      let startX = centerX + cosA * baseRadius;
      let startY = centerY + sinA * baseRadius;
      let endX = centerX + cosA * (baseRadius + barLength);
      let endY = centerY + sinA * (baseRadius + barLength);

      // बिना लैग वाला हैवी नियॉन इफ़ेक्ट
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      
      // बैकग्राउंड नियॉन ग्लो लेयर
      ctx.lineWidth = 8.5; 
      ctx.globalAlpha = 0.25; 
      ctx.stroke();

      // सामने की तीखी चमकदार मेन बार
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

// इवेंट बाइंडिंग्स
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

