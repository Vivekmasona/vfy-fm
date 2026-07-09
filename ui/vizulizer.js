let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;

// डांसर के लिए वेरिएबल्स
let currentFrame = 0;
let lastBeatTime = 0;
let beatThreshold = 110; // बीट पकड़ने की सेंसिटिविटी (गाने के हिसाब से 90-130 सेट कर सकते हैं)

function initNeonDancerVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const baseRadius = 180; // आपकी इमेज के चारों तरफ का रेडियस

  audio.crossOrigin = "anonymous";

  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.smoothingTimeConstant = 0.8; 
      analyser.fftSize = 256; 
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      useFallback = true;
    }
  }

  canvas.classList.add('wave-active');

  // हेल्प फ़ंक्शन: लाइन से बनी लड़की के अलग-अलग डांस पोज़ (Frames)
  // bH (beatHeight) से डांसर के हाथ-पैर बीट पर और ऊपर-नीचे होंगे
  function drawDancerPose(frame, x, y, bH) {
    ctx.save();
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f5ff'; // नियॉन सियान कलर
    ctx.strokeStyle = '#00f5ff';

    // 1. सिर (Head)
    ctx.beginPath();
    ctx.arc(x, y - 55 - (bH * 0.2), 10, 0, Math.PI * 2);
    ctx.stroke();

    // 2. धड़ (Body/Torso)
    ctx.beginPath();
    ctx.moveTo(x, y - 45 - (bH * 0.2));
    ctx.lineTo(x, y - 15);
    ctx.stroke();

    // फ्रेम के हिसाब से अलग-अलग डांस मूव्स (लाइन से बने हुए)
    switch(frame) {
      case 0: // पोज़ 1: दोनों हाथ हवा में, पैर नॉर्मल
        // हाथ
        ctx.beginPath();
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x - 20, y - 60 - bH);
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x + 20, y - 60 - bH);
        // पैर
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 15, y + 15);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 15, y + 15);
        ctx.stroke();
        break;

      case 1: // पोज़ 2: एक हाथ ऊपर, एक कमर पर, एक पैर मुड़ा हुआ
        // हाथ
        ctx.beginPath();
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x - 25, y - 55 - bH); // बायाँ हाथ ऊपर
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x + 15, y - 25);      // दायाँ हाथ कमर पर
        // पैर
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 10, y + 15);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 20, y - 2); 
        ctx.lineTo(x + 10, y + 15); // मुड़ा हुआ पैर
        ctx.stroke();
        break;

      case 2: // पोज़ 3: दोनों हाथ नीचे लहराते हुए (Wave move)
        ctx.beginPath();
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x - 25, y - 30 + bH);
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x + 25, y - 30 + bH);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 20, y + 15);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 20, y + 15);
        ctx.stroke();
        break;

      case 3: // पोज़ 4: डिस्को स्टाइल (एक हाथ तिरछा ऊपर, एक नीचे)
        ctx.beginPath();
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x - 20, y - 15);      // बायाँ हाथ नीचे
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x + 25, y - 65 - bH); // दायाँ हाथ आसमान में
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 15, y + 15);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 15, y + 15);
        ctx.stroke();
        break;
    }
    ctx.restore();
  }

  function drawSpectrum() {
    if ((audio.paused || audio.ended) && !isLoading) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(drawSpectrum);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ==========================================
    // केस 1: लोडिंग लोडर
    // ==========================================
    if (isLoading) {
      thumbBorder.style.transform = "scale(1)";
      loadingAngle += 0.05;
      ctx.save();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, loadingAngle, loadingAngle + (Math.PI * 1.5));
      ctx.strokeStyle = '#ff00ac';
      ctx.stroke();
      ctx.restore();
      return;
    }

    // ==========================================
    // केस 2: प्लेइंग (डांसिंग बीट इफ़ेक्ट)
    // ==========================================
    let bassSum = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      bassSum = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    } else {
      let curTime = audio.currentTime;
      let rawBeat = Math.sin(curTime * 10) * Math.sin(Date.now() * 0.02);
      if (rawBeat > 0.2) bassSum = 150;
    }

    // इमेज पंप को थोड़ा कम और नॉर्मल रखा है ताकि ज्यादा बड़ी न हो
    if (bassSum > 50) {
      const norm = bassSum / 255;
      const scaleFactor = 1 + (norm * 0.10); // मैक्सिमम 10% ज़ूम (एकदम नॉर्मल)
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }

    // --- बीट डिटेक्शन और डांस फ्रेम चेंज ---
    let now = Date.now();
    // अगर बेस थ्रेशोल्ड से ऊपर है और पिछली बीट से 250ms बीत चुके हैं
    if (bassSum > beatThreshold && (now - lastBeatTime > 250)) {
      currentFrame = (currentFrame + 1) % 4; // अगले डांस पोज़ पर जाएँ (कुल 4 फ्रेम्स हैं)
      lastBeatTime = now;
    }

    // बीट के हिसाब से हाथ-पैर की एक्स्ट्रा मूवमेंट हाइट
    let beatHeight = (bassSum / 255) * 25; 

    // थंबनेल इमेज के ठीक ऊपर (Top) पर लड़की को खड़ा करने के लिए पोजीशन
    // centerX (बीच में), centerY - baseRadius (इमेज के ऊपरी हिस्से पर)
    let dancerX = centerX;
    let dancerY = centerY - baseRadius - 10; 

    // डांसर ड्रा करें
    drawDancerPose(currentFrame, dancerX, dancerY, beatHeight);

    // थंबनेल के पीछे एक हल्का नियॉन रिंग ग्लो (ताकि लुक खाली न लगे)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius + 2, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.4;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff00ac';
    ctx.strokeStyle = '#ff00ac';
    ctx.stroke();
    ctx.restore();
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  drawSpectrum();
}

// इवेंट लिस्नर्स
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;

  const startLoading = () => { isLoading = true; initNeonDancerVisualizer(); };
  const stopLoading = () => { isLoading = false; };

  audio.addEventListener('playing', () => { stopLoading(); initNeonDancerVisualizer(); });
  audio.addEventListener('waiting', startLoading);
  audio.addEventListener('seeking', startLoading);
  audio.addEventListener('seeked', stopLoading);
  
  const stopEvents = ['pause', 'ended'];
  stopEvents.forEach(evt => {
    audio.addEventListener(evt, () => {
      isLoading = false;
      const canvas = document.getElementById('fluid-wave-visualizer');
      const thumbBorder = document.querySelector('.thumbnail-border');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (thumbBorder) thumbBorder.style.transform = "scale(1)";
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
  });
});

