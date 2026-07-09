let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;
let wavePhase = 0;

// थंबनेल बीट पंप के लिए वेरिएबल
let currentScale = 1;

function initNeonFluidVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  // कैन्वस साइज सेटअप
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const imgRadius = 180; 

  audio.crossOrigin = "anonymous";

  // ऑडियो कॉन्टेक्स्ट सेटअप
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
    // केस 1: लोडिंग स्टेट (रिंग एनीमेशन)
    // ==========================================
    if (isLoading) {
      thumbBorder.style.transform = "scale(1)"; 
      loadingAngle += 0.08; 
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(loadingAngle);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 15;
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
    // केस 2: प्लेइंग स्टेट (Fluid Smoke/Blob Visualizer)
    // ==========================================
    let bass = 0;
    let mid = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      // इमेज में लेफ्ट साइड में ब्लू/सियान है और राइट में ऑरेंज/पिंक, उसी हिसाब से फ्रीक्वेंसी कैप्चर करेंगे
      bass = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
      mid = (dataArray[6] + dataArray[7] + dataArray[8] + dataArray[9]) / 4;
    } else {
      let curTime = audio.currentTime;
      bass = (Math.sin(curTime * 8) + 1) * 70;
      mid = (Math.cos(curTime * 6) + 1) * 50;
    }

    // --- थंबनेल सिंक बीट पंप (Lerp) ---
    let targetScale = 1 + (bass / 255) * 0.14; 
    currentScale += (targetScale - currentScale) * 0.25; // बीट पर और ज्यादा रिस्पॉन्सिव जर्क
    thumbBorder.style.transform = `scale(${currentScale})`;

    wavePhase += 0.025; // तैरने की स्मूथ स्पीड

    // इमेज जैसा "Fluid Blob" धुंधला लुक बनाने के लिए हेल्प फ़ंक्शन
    function drawFluidBlob(points, baseDepth, color, phaseOffset, audioVal) {
      ctx.save();
      
      // इमेज की तरह सॉफ्ट फ्लूइड लुक देने के लिए 30px का ब्लर फ़िल्टर (यह इसे धुएँ जैसा बनाएगा)
      ctx.filter = 'blur(30px)';
      
      // कलर्स को आपस में मिक्स करने की सेटिंग ताकि नियॉन लाइट फील हो
      ctx.globalCompositeOperation = 'screen';
      
      ctx.fillStyle = color;
      ctx.beginPath();
      
      for (let i = 0; i <= points; i++) {
        let angle = (i / points) * Math.PI * 2;
        
        // आर्गेनिक लिक्विड वेव बनाने के लिए Sine और Cosine का कॉम्बिनेशन
        let blobMovement = Math.sin(angle * 2 + wavePhase + phaseOffset) * 
                           Math.cos(angle * 1.5 - wavePhase) * 
                           (baseDepth + (audioVal / 255) * 85); // बीट पर फ्लूइड का फैलाव

        // थंबनेल के पीछे से लिक्विड बाहर निकलेगा
        let r = imgRadius + 20 + blobMovement;
        let x = centerX + Math.cos(angle) * r;
        let y = centerY + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fill(); // स्ट्रोक की जगह 'fill' जिससे सॉलिड रंगीन धुआँ बने
      ctx.restore();
    }

    // --- इमेज कलर थीम के अनुसार दो फ्लूइड लेयर्स ---
    
    // 1. लेफ्ट साइड के लिए डीप ब्लू/सियान फ्लूइड (मिड-लो फ्रीक्वेंसी पर रिएक्ट करेगा)
    drawFluidBlob(40, 20, 'rgba(0, 110, 255, 0.85)', 0, mid); 
    
    // 2. राइट साइड के लिए नियॉन ऑरेंज/गोल्डन फ्लूइड (यह हैवी बास पर तेजी से फैलेगा)
    drawFluidBlob(35, 25, 'rgba(255, 136, 0, 0.9)', Math.PI, bass);

  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
}

// ==========================================
// इवेंट लिस्नर्स
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;

  const startLoading = () => {
    if (!isLoading) {
      isLoading = true;
      initNeonFluidVisualizer();
    }
  };

  const stopLoading = () => {
    isLoading = false;
  };

  audio.addEventListener('loadstart', startLoading);
  audio.addEventListener('waiting', startLoading);
  
  audio.addEventListener('playing', () => {
    stopLoading();
    initNeonFluidVisualizer(); 
  });
  
  audio.addEventListener('canplaythrough', stopLoading);
  audio.addEventListener('seeking', startLoading);
  audio.addEventListener('seeked', stopLoading);
  audio.addEventListener('error', () => { 
    console.error("Audio error");
    useFallback = true; 
    stopLoading(); 
  });

  const stopEvents = ['pause', 'ended'];
  stopEvents.forEach(evt => {
    audio.addEventListener(evt, () => {
      isLoading = false;
      const canvas = document.getElementById('fluid-wave-visualizer');
      const thumbBorder = document.querySelector('.thumbnail-border');
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      
      if (canvas) {
        canvas.classList.remove('wave-active');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (thumbBorder) thumbBorder.style.transform = "scale(1)";
    });
  });
});
