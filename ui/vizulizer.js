let audioCtx = null;
let animationFrameId = null;
let isLoading = false;
let loadingAngle = 0;

function initOnlyLoader() {
  const audio = document.getElementById('SAudio');
  const canvas = document.getElementById('fluid-wave-visualizer');
  const thumbBorder = document.querySelector('.thumbnail-border'); 
  if (!audio || !canvas || !thumbBorder) return;

  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;
  
  const centerX = 300;
  const centerY = 300;
  const imgRadius = 180; 

  canvas.classList.add('wave-active');

  // ड्रा फ़ंक्शन - जो सिर्फ लोडिंग रिंग घुमाएगा
  function draw() {
    // अगर गाना लोड नहीं हो रहा है, तो लूप रोक दो और कैनवस साफ़ कर दो
    if (!isLoading) {
      ctx.clearRect(0, 0, 600, 600);
      canvas.classList.remove('wave-active');
      return;
    }

    animationFrameId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, 600, 600);

    // ==========================================
    // केवल लोडिंग स्टेट (घूमती हुई नियॉन रिंग)
    // ==========================================
    loadingAngle += 0.08; // घूमने की स्पीड
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(loadingAngle);
    
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 0; // बिना लैग के क्लीन लुक के लिए
    
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
  }

  draw();
}

// ==========================================
// इवेंट लिस्नर्स (सिर्फ लोडिंग डिटेक्ट करने के लिए)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('SAudio');
  if (!audio) return;

  const startLoading = () => {
    if (!isLoading) {
      isLoading = true;
      initOnlyLoader();
    }
  };

  const stopLoading = () => {
    isLoading = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    const canvas = document.getElementById('fluid-wave-visualizer');
    if (canvas) {
      canvas.classList.remove('wave-active');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 600, 600);
    }
  };

  // गाना लोड, बफ़र या सीक होने पर लोडिंग शुरू करें
  audio.addEventListener('loadstart', startLoading);
  audio.addEventListener('waiting', startLoading);
  audio.addEventListener('seeking', startLoading);
  
  // गाना चलने पर या लोड पूरा होने पर लोडिंग तुरंत बंद
  audio.addEventListener('playing', stopLoading);
  audio.addEventListener('canplaythrough', stopLoading);
  audio.addEventListener('seeked', stopLoading);
  audio.addEventListener('error', stopLoading);

  // गाना पॉज़ या ख़त्म होने पर भी सब साफ़ रखें
  const stopEvents = ['pause', 'ended'];
  stopEvents.forEach(evt => {
    audio.addEventListener(evt, stopLoading);
  });
});

