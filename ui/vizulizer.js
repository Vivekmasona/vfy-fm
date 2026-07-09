let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;

// डांसर वेरिएबल्स
let currentFrame = 0;
let lastBeatTime = 0;
let beatThreshold = 105; // बीट सेंसिटिविटी

function initNeonGirlVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const baseRadius = 180; 

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

  // =========================================================
  // न्यू गर्ल डांसर फ़ंक्शन (लंबे बाल और स्कर्ट के साथ)
  // =========================================================
  function drawGirlDancer(frame, x, y, bH) {
    ctx.save();
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // नियॉन पिंक/मैजेंटा ग्लो (आपकी रेफरेंस इमेज की तरह)
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ac';
    ctx.strokeStyle = '#ff00ac';

    // ऊँचाई एडजस्टमेंट (बीट पर थोड़ा सा बाउंस)
    const bounce = bH * 0.3;
    const headY = y - 75 - bounce;
    const neckY = y - 65 - bounce;
    const waistY = y - 35 - bounce;
    const skirtBottomY = y - 10 - bounce;

    // 1. सिर (Head)
    ctx.beginPath();
    ctx.arc(x, headY, 9, 0, Math.PI * 2);
    ctx.stroke();

    // 2. लंबे नियॉन बाल (Long Flowing Hair) - फ्रेम के हिसाब से हिलेंगे
    ctx.save();
    ctx.strokeStyle = '#ff00ac';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (frame === 0 || frame === 2) {
      // बाल पीछे और कंधों पर बिखरे हुए
      ctx.moveTo(x - 8, headY - 4);
      ctx.bezierCurveTo(x - 18, headY + 5, x - 15, neckY + 15, x - 12, waistY);
      ctx.moveTo(x + 8, headY - 4);
      ctx.bezierCurveTo(x + 18, headY + 5, x + 15, neckY + 15, x + 12, waistY);
    } else {
      // डांस करते हुए बाल एक तरफ लहराते हुए
      ctx.moveTo(x - 6, headY - 4);
      ctx.bezierCurveTo(x - 14, headY + 5, x - 20, neckY + 15, x - 22, waistY + 5);
      ctx.moveTo(x + 8, headY - 4);
      ctx.bezierCurveTo(x + 10, headY + 10, x + 5, neckY + 15, x, waistY);
    }
    ctx.stroke();
    ctx.restore();

    // 3. धड़ (Torso/Body)
    ctx.beginPath();
    ctx.moveTo(x, neckY);
    ctx.lineTo(x, waistY);
    ctx.stroke();

    // 4. स्कर्ट/ड्रेस (Feminine Skirt Shape)
    ctx.beginPath();
    ctx.moveTo(x, waistY); // कमर
    if (frame === 1) { // स्कर्ट लेफ्ट स्विंग
      ctx.lineTo(x - 22, skirtBottomY);
      ctx.lineTo(x + 12, skirtBottomY);
    } else if (frame === 3) { // स्कर्ट राइट स्विंग
      ctx.lineTo(x - 12, skirtBottomY);
      ctx.lineTo(x + 22, skirtBottomY);
    } else { // स्कर्ट नॉर्मल फ्लेयर
      ctx.lineTo(x - 18, skirtBottomY);
      ctx.lineTo(x + 18, skirtBottomY);
    }
    ctx.closePath();
    ctx.stroke();

    // 5. हाथ और पैर (Frames के अनुसार डांस मूव्स)
    ctx.beginPath();
    switch(frame) {
      case 0: // पोज़ 1: दोनों हाथ ऊपर हवा में लहराते हुए
        // हाथ
        ctx.moveTo(x, neckY + 5);
        ctx.bezierCurveTo(x - 15, neckY - 10, x - 20, headY - 15, x - 15, headY - 25 - bH);
        ctx.moveTo(x, neckY + 5);
        ctx.bezierCurveTo(x + 15, neckY - 10, x + 20, headY - 15, x + 15, headY - 25 - bH);
        // पैर
        ctx.moveTo(x - 6, skirtBottomY); ctx.lineTo(x - 8, y);
        ctx.moveTo(x + 6, skirtBottomY); ctx.lineTo(x + 8, y);
        break;

      case 1: // पोज़ 2: एक हाथ कमर पर, एक हाथ हवा में मॉडल पोज़
        // हाथ
        ctx.moveTo(x, neckY + 5);
        ctx.lineTo(x - 15, waistY - 2); ctx.lineTo(x - 5, waistY); // कमर पर हाथ
        ctx.moveTo(x, neckY + 5);
        ctx.lineTo(x + 22, headY - 10 - bH); // हवा में हाथ
        // पैर (एक पैर थोड़ा क्रॉस)
        ctx.moveTo(x - 8, skirtBottomY); ctx.lineTo(x - 2, y);
        ctx.moveTo(x + 4, skirtBottomY); ctx.lineTo(x + 12, y);
        break;

      case 2: // पोज़ 3: दोनों हाथ साइड में एक्सटेंडेड (Hip-hop/Pop style)
        // हाथ
        ctx.moveTo(x, neckY + 5);
        ctx.lineTo(x - 25, neckY + 15 - bH);
        ctx.moveTo(x, neckY + 5);
        ctx.lineTo(x + 25, neckY + 15 - bH);
        // पैर (थोड़े चौड़े)
        ctx.moveTo(x - 10, skirtBottomY); ctx.lineTo(x - 14, y);
        ctx.moveTo(x + 10, skirtBottomY); ctx.lineTo(x + 14, y);
        break;

      case 3: // पोज़ 4: डिस्को पोज़ (एक हाथ तिरछा ऊपर, एक नीचे)
        // हाथ
        ctx.moveTo(x, neckY + 5);
        ctx.lineTo(x - 18, waistY + 10); // नीचे
        ctx.moveTo(x, neckY + 5);
        ctx.lineTo(x + 20, headY - 25 - bH); // ऊपर आसमान की तरफ
        // पैर
        ctx.moveTo(x - 4, skirtBottomY); ctx.lineTo(x - 6, y);
        ctx.moveTo(x + 6, skirtBottomY); ctx.lineTo(x + 4, y);
        break;
    }
    ctx.stroke();
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

    // लोडिंग स्टेट
    if (isLoading) {
      thumbBorder.style.transform = "scale(1)";
      loadingAngle += 0.05;
      ctx.save();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, loadingAngle, loadingAngle + (Math.PI * 1.5));
      ctx.strokeStyle = '#00f5ff';
      ctx.stroke();
      ctx.restore();
      return;
    }

    // प्लेइंग स्टेट
    let bassSum = 0;
    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      bassSum = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    } else {
      let curTime = audio.currentTime;
      let rawBeat = Math.sin(curTime * 10) * Math.sin(Date.now() * 0.02);
      if (rawBeat > 0.2) bassSum = 140;
    }

    // इमेज पंप इफ़ेक्ट (एकदम नॉर्मल रखा है ताकि इमेज ज़्यादा बड़ी न हो)
    if (bassSum > 50) {
      const norm = bassSum / 255;
      const scaleFactor = 1 + (norm * 0.08); 
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }

    // बीट डिटेक्शन सिंक
    let now = Date.now();
    if (bassSum > beatThreshold && (now - lastBeatTime > 260)) {
      currentFrame = (currentFrame + 1) % 4; 
      lastBeatTime = now;
    }

    let beatHeight = (bassSum / 255) * 20; 

    // प्लेसमेंट: गोल इमेज के ठीक ऊपर सेट
    let dancerX = centerX;
    let dancerY = centerY - baseRadius - 8; 

    // लड़की को ड्रा करें
    drawGirlDancer(currentFrame, dancerX, dancerY, beatHeight);

    // बैकग्राउंड में एक सुंदर नियॉन सियान आउटर रिंग
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius + 2, 0, Math.PI * 2);
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f5ff';
    ctx.strokeStyle = '#00f5ff';
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

  const startLoading = () => { isLoading = true; initNeonGirlVisualizer(); };
  const stopLoading = () => { isLoading = false; };

  audio.addEventListener('playing', () => { stopLoading(); initNeonGirlVisualizer(); });
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
