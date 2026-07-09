let audioCtx = null;
let analyser = null;
let dataArray = null;
let animationFrameId = null;

const audio = document.getElementById('SAudio');
const thumb = document.getElementById('thumb');
const loader = document.getElementById('loader');

function startVisualizer() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64; // बहुत कम साइज ताकि CPU पर लोड न पड़े
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  }

  function update() {
    if (audio.paused) return;

    analyser.getByteFrequencyData(dataArray);
    
    // सिर्फ बास (Bass) का एवरेज लें
    let bass = (dataArray[0] + dataArray[1] + dataArray[2]) / 3;
    
    // स्केल कैलकुलेशन: बास के हिसाब से 1 से 1.15 के बीच पंप होगा
    let scale = 1 + (bass / 255) * 0.15;
    
    // स्मूथ इफ़ेक्ट के लिए
    thumb.style.transform = `scale(${scale})`;
    
    animationFrameId = requestAnimationFrame(update);
  }
  update();
}

// लोडिंग और प्लेइंग हैंडलिंग
audio.addEventListener('loadstart', () => loader.style.display = 'block');
audio.addEventListener('playing', () => {
  loader.style.display = 'none';
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  startVisualizer();
});

audio.addEventListener('pause', () => {
  cancelAnimationFrame(animationFrameId);
  thumb.style.transform = "scale(1)";
});

