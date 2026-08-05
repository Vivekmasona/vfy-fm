let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;
let wavePhase = 0; // वेव के तैरने की गति के लिए

function initNeonFluidVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  // थंबनेल का बॉर्डर कंटेनर
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  // कैनवस का साइज़ सेट करें
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // इमेज का रेडियस (इसे अपनी CSS के अनुसार एडजस्ट करें)
  // पुराने 'baseRadius' से थोड़ा कम ताकि वेव्स पास रहें
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

      analyser.smoothingTimeConstant = 0.85; // वेव्स को स्मूथ रखने के लिए ज़्यादा
      analyser.fftSize = 512; // बेहतर फ्रीक्वेंसी डिटेल के लिए
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.error("AudioContext error, using fallback:", e);
      useFallback = true;
    }
  }

  canvas.classList.add('wave-active');

  // ड्रा फ़ंक्शन - जो बार-बार कॉल होगा
  function draw() {
    // अगर गाना रुका है, तो सब साफ़ कर दो
    if ((audio.paused || audio.ended) && !isLoading) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ==========================================
    // केस 1: लोडिंग स्टेट (घूमता हुआ नियॉन रिंग)
    // ==========================================
    if (isLoading) {
      thumbBorder.style.transform = "scale(1)"; 
      
      loadingAngle += 0.08; 
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(loadingAngle);
      
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      
      // नियॉन ग्लो
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00f5ff';
      
      // दो अधूरे आर्क
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, 0, Math.PI * 0.8);
      ctx.strokeStyle = '#00f5ff'; // सियान
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, Math.PI, Math.PI * 1.8);
      ctx.strokeStyle = '#ff00ac'; // पिंक
      ctx.stroke();
      
      ctx.restore();
      return; 
    }

    // ==========================================
    // केस 2: प्लेइंग स्टेट (फ्लूइड नियॉन वेव्स)
    // ==========================================
    let bass = 0;
    let mid = 0;

    // ऑडियो डेटा प्राप्त करें
    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      // बास (low frequencies)
      bass = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
      // मिड (mid frequencies)
      mid = (dataArray[10] + dataArray[11] + dataArray[12] + dataArray[13]) / 4;
    } else {
      // फॉलबैक (सिर्फ टेस्ट के लिए, अगर ऑडियो काम न करे)
      let curTime = audio.currentTime;
      bass = (Math.sin(curTime * 8) + 1) * 60;
      mid = (Math.cos(curTime * 6) + 1) * 40;
    }

    // --- इमेज पंप इफेक्ट ---
    // केवल तेज़ बास पर ही इमेज थोड़ी बड़ी होगी
    if (bass > 100) {
      const scaleFactor = 1 + (bass / 255) * 0.12; 
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }

    // --- वेव पैरामीटर्स ---
    wavePhase += 0.02; // वेव्स के तैरने की स्पीड

    // वेव ड्रा करने का हेल्प फ़ंक्शन
    // points: सर्कल में कितने पॉइंट होंगे, depth: वेव कितनी ऊंची होगी, color: वेव का रंग
    function drawFluidWave(points, depth, color, phaseOffset) {
      ctx.save();
      
      ctx.shadowBlur = 20; // नियॉन ग्लो
      ctx.shadowColor = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      
      for (let i = 0; i <= points; i++) {
        let angle = (i / points) * Math.PI * 2;
        
        // ऑडियो के अनुसार वेव की ऊंचाई बदलें
        // Sine waves को कंबाइन करके लिक्विड इफ़ेक्ट बनाना
        let audioInfluence = (i < points / 2) ? bass : mid; // आधे सर्कल में बास, आधे में मिड
        
        let waveHeight = Math.sin(angle * 4 + wavePhase + phaseOffset) * 
                         Math.cos(angle * 2 - wavePhase * 0.5) * 
                         (depth + (audioInfluence / 255) * 40);

        // वेव का रेडियस: इमेज के रेडियस से थोड़ा ज़्यादा + वेव की ऊंचाई
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

    // --- दो अलग-अलग वेव्स ड्रा करें ---
    
    // 1. बाहरी वेव (सियान/ब्लू) - मिड फ्रीक्वेंसी पर ज़्यादा रिएक्ट करेगी
    drawFluidWave(100, 10, '#00f5ff', 0); 
    
    // 2. अंदरूनी वेव (पिंक/मैजेंटा) - बास पर ज़्यादा रिएक्ट करेगी
    drawFluidWave(80, 15, '#ff00ac', Math.PI); // PhaseOffset से दोनों वेव अलग दिखेंगी

  }

  // शुरू करें
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
}

// ==========================================
// इवेंट लिस्नर्स (पहले जैसे ही, थोड़े ऑप्टिमाइज़्ड)
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
    // सुनिश्चित करें कि विज़ुअलाइज़र शुरू हो गया है
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

