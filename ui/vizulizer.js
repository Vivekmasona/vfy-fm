let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;
let isLoading = false;
let loadingAngle = 0;

function initPureImageWithLoader() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !thumbBorder) return;

  // कैनवस सिर्फ लोडिंग रिंग दिखाने के लिए इस्तेमाल होगा
  const ctx = canvas ? canvas.getContext('2d') : null;
  if (canvas) {
    canvas.width = 600;
    canvas.height = 600;
  }
  const centerX = 300;
  const centerY = 300;
  const imgRadius = 180; 

  audio.crossOrigin = "anonymous";

  // ऑडियो कॉन्टेक्स्ट सेटअप (सिर्फ बीट पंप के लिए डेटा लेने के लिए)
  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.75;
      analyser.fftSize = 256; 
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.error("AudioContext error, using fallback:", e);
      useFallback = true;
    }
  }

  if (canvas) canvas.classList.add('wave-active');

  // ड्रा फ़ंक्शन जो लूप में चलेगा
  function draw() {
    // अगर गाना रुक गया है और लोड भी नहीं हो रहा, तो सब रोक दो
    if ((audio.paused || audio.ended) && !isLoading) {
      if (ctx) ctx.clearRect(0, 0, 600, 600);
      if (canvas) canvas.classList.remove('wave-active');
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(draw);
    if (ctx) ctx.clearRect(0, 0, 600, 600);

    // ==========================================
    // केस 1: लोडिंग स्टेट (सिर्फ घूमती हुई सुंदर रिंग दिखेगी)
    // ==========================================
    if (isLoading && ctx) {
      thumbBorder.style.transform = "scale(1)"; 
      loadingAngle += 0.08; // घूमने की स्पीड
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(loadingAngle);
      
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 0; // बिना लैग के क्लीन लुक के लिए शैडो 0 रखी है
      
      // पहला आधा हिस्सा (सियान कलर)
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, 0, Math.PI * 0.8);
      ctx.strokeStyle = '#00f5ff'; 
      ctx.stroke();
      
      // दूसरा आधा हिस्सा (पिंक कलर)
      ctx.beginPath();
      ctx.arc(0, 0, imgRadius + 10, Math.PI, Math.PI * 1.8);
      ctx.strokeStyle = '#ff00ac'; 
      ctx.stroke();
      
      ctx.restore();
      return; // यहाँ से लौट रहे हैं ताकि गाना लोड होते समय बीट काउंट न हो
    }

    // ==========================================
    // केस 2: प्लेइंग स्टेट (कोई वेव नहीं, सिर्फ इमेज पंप)
    // ==========================================
    let bass = 0;

    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      bass = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    } else {
      bass = (Math.sin(audio.currentTime * 8) + 1) * 60;
    }

    // इमेज पंप इफ़ेक्ट (बीट पर ज़ूम होना)
    if (bass > 90) {
      const scaleFactor = 1 + (bass / 255) * 0.14; 
      thumbBorder.style.transform = `scale(${scaleFactor})`;
    } else {
      thumbBorder.style.transform = "scale(1)";
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  draw();
}

// ==========================================
// स्मार्ट इवेंट लिस्नर्स (लोडिंग और प्लेइंग मैनेज करने के लिए)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;

  const startLoading = () => {
    if (!isLoading) {
      isLoading = true;
      initPureImageWithLoader();
    }
  };

  const stopLoading = () => {
    isLoading = false;
  };

  // गाना लोड होना शुरू होने या बफ़र होने पर लोडर रिंग ऑन करें
  audio.addEventListener('loadstart', startLoading);
  audio.addEventListener('waiting', startLoading);
  audio.addEventListener('seeking', startLoading);
  
  // गाना चलने पर लोडर बंद और बीट पंप चालू
  audio.addEventListener('playing', () => {
    stopLoading();
    initPureImageWithLoader(); 
  });
  
  audio.addEventListener('canplaythrough', stopLoading);
  audio.addEventListener('seeked', stopLoading);
  audio.addEventListener('error', () => { 
    useFallback = true; 
    stopLoading(); 
  });

  // गाना पॉज़ या ख़त्म होने पर सब नॉर्मल करें
  const stopEvents = ['pause', 'ended'];
  stopEvents.forEach(evt => {
    audio.addEventListener(evt, () => {
      isLoading = false;
      const canvas = document.getElementById('fluid-wave-visualizer');
      const thumbBorder = document.querySelector('.thumbnail-border');
      if (canvas) {
        canvas.classList.remove('wave-active');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 600, 600);
      }
      if (thumbBorder) thumbBorder.style.transform = "scale(1)";
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
  });
});

