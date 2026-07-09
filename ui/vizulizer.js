let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let animationFrameId = null;
let useFallback = false;

const audio = document.getElementById('SAudio');
const thumb = document.getElementById('thumb');
const loader = document.getElementById('neon-loader');

function initAudioVisualizer() {
  if (!audioCtx && !useFallback) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      analyser.smoothingTimeConstant = 0.75; // बीट बाउंस को क्रिस्प रखने के लिए
      analyser.fftSize = 64; // सबसे छोटा साइज (प्रोसेसिंग लोड ऑलमोस्ट जीरो)
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.error("AudioContext error, using fallback:", e);
      useFallback = true;
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  function doBeatPump() {
    if (audio.paused || audio.ended) {
      thumb.style.transform = "scale(1)";
      return;
    }

    animationFrameId = requestAnimationFrame(doBeatPump);

    let bass = 0;
    if (!useFallback && analyser) {
      analyser.getByteFrequencyData(dataArray);
      // शुरुआती सबसे भारी फ्रीक्वेंसी (Bass) को पकड़ने के लिए
      bass = (dataArray[0] + dataArray[1] + dataArray[2]) / 3;
    } else {
      // फॉलबैक: अगर ऑडियो कॉन्टेक्स्ट काम न करे तो टाइम के हिसाब से हल्का पंप
      bass = (Math.sin(audio.currentTime * 8) + 1) * 60;
    }

    // स्केल: बेस वैल्यू 1 + बास के हिसाब से मैक्सिमम 0.14 तक ज़ूम इन (टोटल 1.14x)
    let scale = 1 + (bass / 255) * 0.14;
    thumb.style.transform = `scale(${scale})`;
  }

  doBeatPump();
}

// ==========================================
// परफेक्ट लोडिंग और प्लेइंग इवेंट्स
// ==========================================

const showLoader = () => {
  if (loader) loader.style.display = 'block';
};

const hideLoader = () => {
  if (loader) loader.style.display = 'none';
};

audio.addEventListener('loadstart', showLoader);
audio.addEventListener('waiting', showLoader);
audio.addEventListener('seeking', showLoader);

audio.addEventListener('playing', () => {
  hideLoader();
  initAudioVisualizer();
});

audio.addEventListener('canplaythrough', hideLoader);
audio.addEventListener('seeked', hideLoader);

audio.addEventListener('pause', () => {
  hideLoader();
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (thumb) thumb.style.transform = "scale(1)";
});

audio.addEventListener('ended', () => {
  hideLoader();
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (thumb) thumb.style.transform = "scale(1)";
});

audio.addEventListener('error', () => {
  console.error("Audio error encountered");
  useFallback = true;
  hideLoader();
});

