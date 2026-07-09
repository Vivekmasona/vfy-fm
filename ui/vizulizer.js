let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;

function initPureImageVisualizer() {
  const audio = document.getElementById('SAudio');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !thumbBorder) return;

  audio.crossOrigin = "anonymous";

  // ऑडियो कॉन्टेक्स्ट सेटअप (सिर्फ बीट डेटा रीड करने के लिए)
  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.75; // पंपिंग को फुर्तीला रखने के लिए थोड़ा कम किया
      analyser.fftSize = 256; // जब सिर्फ बास चाहिए तो छोटा साइज़ बेस्ट है
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.error("AudioContext error, using fallback:", e);
      useFallback = true;
    }
  }

  // ड्रा फ़ंक्शन - जो केवल इमेज को ज़ूम करेगा
  function draw() {
    if (audio.paused || audio.ended) {
      thumbBorder.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(draw);

    let bass = 0;

    // ऑडियो से बास (Low Frequencies) निकालना
    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      // बास की पहली 4 फ्रीक्वेंसी का एवरेज
      bass = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    } else {
      // फॉलबैक टेस्ट (अगर ऑडियो ब्लॉक हो)
      bass = (Math.sin(audio.currentTime * 8) + 1) * 60;
    }

    // --- केवल इमेज पंप इफेक्ट ---
    if (bass > 90) { // 90 से ऊपर की बीट पर ही पंप होगा
      const scaleFactor = 1 + (bass / 255) * 0.14; // पंप की ताकत (0.14)
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
// सीधे सादे इवेंट लिस्नर्स
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;
  
  audio.addEventListener('playing', () => {
    initPureImageVisualizer(); 
  });

  const stopEvents = ['pause', 'ended'];
  stopEvents.forEach(evt => {
    audio.addEventListener(evt, () => {
      const thumbBorder = document.querySelector('.thumbnail-border');
      if (thumbBorder) thumbBorder.style.transform = "scale(1)";
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
  });
});

