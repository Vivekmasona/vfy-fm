let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;
let wavePhase = 0;

// स्मूथ थंबनेल पंप के लिए वेरिएबल
let currentScale = 1;

function initNeonFluidVisualizer() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  
  // एक बार साइज सेट करें
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const imgRadius = 180; 

  audio.crossOrigin = "anonymous";

  // ऑडियो कॉन्टेक्स्ट सेटअप (सिर्फ एक बार)
  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.8; // वेव्स की स्मूथनेस के लिए बैलेंस्ड
      analyser.fftSize = 256; // परफॉर्मेंस बढ़ाने और बास को सटीक पकड़ने के लिए 256 बेहतर है
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.error("AudioContext error, using fallback:", e);
      useFallback = true;
    }
  }

  // अगर पहले से लूप चल रहा है तो उसे रोकें ताकि डुप्लिकेट लूप न बने (लैग से बचाव)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  canvas.classList.add('wave-active');

  function draw() {
    // अगर ऑडियो बंद है और लोड भी नहीं हो रहा, तो लूप रोकें
    if ((audio.paused || audio.ended) && !isLoading) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ==========================================
    // केस 1: लोडिंग स्टेट (वही पुराना एनीमेशन)
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
    // केस 2: प्लेइंग स्टेट (ऑप्टिमाइज़्ड और पल्सिंग)
    // ==========================================
    let bass = 0;
    let mid = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      // शुरुआती कुछ बिन सबसे हैवी बास (sub-bass/kick) के होते हैं
      bass = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
      mid = (dataArray[8] + dataArray[9] + dataArray[10] + dataArray[11]) / 4;
    } else {
      let curTime = audio.currentTime;
      bass = (Math.sin(curTime * 8) + 1) * 60;
      mid = (Math.cos(curTime * 6) + 1) * 40;
    }

    // --- दमदार और स्मूथ थंबनेल पंप इफ़ेक्ट (Lerp) ---
    // बास की वैल्यू को 0 से 1 के स्केल में बदलें
    let targetScale = 1 + (bass / 255) * 0.15; // 0.15 का मतलब अधिकतम 15% ज़ूम (इसे बढ़ा भी सकते हैं)
    
    // Lerp फ़ॉर्मूला: धीरे-धीरे टारगेट स्केल की तरफ बढ़ना (स्मूथनेस का राज)
    // बीट पर तेजी से बढ़ेगा, पर खाली जगह में स्मूथली सिकुड़ेगा
    currentScale += (targetScale - currentScale) * 0.2; 
    thumbBorder.style.transform = `scale(${currentScale})`;

    // --- वेव पैरामीटर्स ---
    wavePhase += 0.04; // वेव की तैरने की स्पीड थोड़ी बढ़ाई ताकि डायनामिक लगे

    function drawFluidWave(points, depth, color, phaseOffset, audioVal) {
      ctx.save();
      ctx.shadowBlur = 25; // नियॉन ग्लो थोड़ा और गहरा किया
      ctx.shadowColor = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      
      for (let i = 0; i <= points; i++) {
        let angle = (i / points) * Math.PI * 2;
        
        // पूरी वेव पर ऑडियो का प्रभाव और बेहतर लिक्विड मूवमेंट
        let waveHeight = Math.sin(angle * 3 + wavePhase + phaseOffset) * 
                         Math.cos(angle * 2 - wavePhase * 0.3) * 
                         (depth + (audioVal / 255) * 55); // वेव का बाउंस बढ़ाया

        let r = imgRadius + 15 + waveHeight;
        let x = centerX + Math.cos(angle) * r;
        let y = centerY + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    // 1. बाहरी वेव (सियान) - मिड फ्रीक्वेंसी
    drawFluidWave(70, 10, '#00f5ff', 0, mid); // पॉइंट्स 100 से 70 किए (परफॉर्मेंस बूस्ट)
    
    // 2. अंदरूनी वेव (पिंक) - बास फ्रीक्वेंसी (यह थंबनेल के पंप के साथ सिंक होगी)
    drawFluidWave(60, 15, '#ff00ac', Math.PI, bass); // पॉइंट्स 80 से 60 किए
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
}

// ==========================================
// ऑप्टिमाइज़्ड इवेंट लिस्नर्स
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

