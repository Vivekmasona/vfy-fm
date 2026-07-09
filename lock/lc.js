/* ---------------- GLOBAL ELEMENTS & VISUALIZER CONFIG ---------------- */
const footer = document.querySelector('.fixed-footer');
const progressBar = document.getElementById('progressBarContainer');
const audioPlayerContainer = document.getElementById('audioPlayerContainer');
const lockOverlay = document.getElementById("lockOverlay");
const overlayThumb = document.getElementById("overlayThumb");
const overlayTitle = document.getElementById("overlayTitle");
const overlayTime = document.getElementById("overlayTime");
const audioPlayer = document.getElementById("SAudio");
const themeMeta = document.getElementById("themeColorMeta");
const modeToggleBtn = document.getElementById("modeToggleBtn");
const sideMenu = document.getElementById('sideMenu');

// HD Fullscreen Lockscreen Canvas Engine Config
const lCanvas = document.getElementById("lockCanvas");
const lCtx = lCanvas.getContext("2d");
let lAnimationId;
let lSmoothZoom = 75;
let lDynamicHue = 175; 
let globalMutationTracker = 0; 

let lastScrollTop = 0;
let overlayTimer;
let sideMenuTimer;
let wakeLock = null;
let isScrollTicking = false; 

function resizeLockCanvas() {
  const dpr = window.devicePixelRatio || 1;
  lCanvas.width = window.innerWidth * dpr;
  lCanvas.height = window.innerHeight * dpr;
  lCtx.scale(dpr, dpr);
}
window.addEventListener('resize', resizeLockCanvas);

/* ---------------- PREMIUM HIGH-COHERENCE AMOLED NEURAL VISUALIZER ---------------- */
const amoledParticles = [];
const maxParticles = 65;

function initAmoledParticles() {
  for (let i = 0; i < maxParticles; i++) {
    amoledParticles.push({
      angle: Math.random() * Math.PI * 2,
      distanceRatio: 0.3 + Math.random() * 0.7,
      size: 0.8 + Math.random() * 1.5,
      speed: 0.002 + Math.random() * 0.005,
      seed: Math.random() * 100
    });
  }
}
initAmoledParticles();

function renderLockVisuals() {
  if (lockOverlay.style.display !== "flex") {
    cancelAnimationFrame(lAnimationId);
    return;
  }
  
  lAnimationId = requestAnimationFrame(renderLockVisuals);
  
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (!audioPlayer || audioPlayer.paused) {
    hideOverlay();
    return;
  }

  let isActuallyPlaying = audioPlayer.readyState >= 3;

  if (!isActuallyPlaying) {
    if(overlayThumb) overlayThumb.style.transform = `scale(1)`;
    return; 
  }

  globalMutationTracker += 0.025; 

  let bassPulse = 25 + Math.sin(globalMutationTracker * 1.8) * 12 
                        + Math.cos(globalMutationTracker * 0.9) * 10;

  if (Math.floor(globalMutationTracker * 0.15) % 2 === 0) {
      lDynamicHue = (180 + Math.sin(globalMutationTracker * 0.08) * 25) % 360; 
  } else {
      lDynamicHue = (355 + Math.sin(globalMutationTracker * 0.08) * 15) % 360; 
  }

  let minR = 75;
  let targetZoom = minR + (bassPulse * 0.25);
  lSmoothZoom += (targetZoom - lSmoothZoom) * 0.15;

  if(overlayThumb) {
     overlayThumb.style.transform = `scale(${lSmoothZoom / minR})`;
  }

  lCtx.clearRect(0, 0, w, h);
  lCtx.fillStyle = "#000000";
  lCtx.fillRect(0, 0, w, h);

  const coreWrap = document.querySelector('.visualizer-core-wrap');
  if(!coreWrap) return;
  const coreBounds = coreWrap.getBoundingClientRect();
  const cx = coreBounds.left + (coreBounds.width / 2);
  const cy = coreBounds.top + (coreBounds.height / 2);

  // 1. Center Sharp Laser Orbits
  lCtx.save();
  lCtx.lineWidth = 1.5;
  
  lCtx.beginPath();
  lCtx.arc(cx, cy, lSmoothZoom + 2, 0, Math.PI * 2);
  lCtx.strokeStyle = `hsla(${lDynamicHue}, 100%, 50%, 0.85)`;
  lCtx.stroke();

  lCtx.beginPath();
  lCtx.arc(cx, cy, lSmoothZoom + 25 + Math.sin(globalMutationTracker) * 8, 0, Math.PI * 2);
  lCtx.setLineDash([4, 12]);
  lCtx.strokeStyle = `hsla(${lDynamicHue - 30}, 100%, 45%, 0.4)`;
  lCtx.stroke();
  lCtx.restore();

  // 2. Cyber Particle Network Array
  lCtx.save();
  const maxReach = Math.min(w, h) * 0.48;
  
  amoledParticles.forEach((p) => {
    p.angle += p.speed * (1 + bassPulse * 0.05);
    
    let pulseDist = lSmoothZoom + 5 + (maxReach * p.distanceRatio) + Math.sin(globalMutationTracker + p.seed) * 15;
    
    let px = cx + Math.cos(p.angle) * pulseDist;
    let py = cy + Math.sin(p.angle) * pulseDist;
    
    let alpha = (1 - (p.distanceRatio)) * 0.65;
    
    lCtx.fillStyle = `hsla(${lDynamicHue + (p.angle * 10)}, 100%, 65%, ${alpha})`;
    lCtx.beginPath();
    lCtx.arc(px, py, p.size * (1 + bassPulse * 0.02), 0, Math.PI * 2);
    lCtx.fill();

    amoledParticles.forEach((p2) => {
       let p2Dist = lSmoothZoom + 5 + (maxReach * p2.distanceRatio) + Math.sin(globalMutationTracker + p2.seed) * 15;
       let p2x = cx + Math.cos(p2.angle) * p2Dist;
       let p2y = cy + Math.sin(p2.angle) * p2Dist;
       let distance = Math.hypot(px - p2x, py - p2y);
       
       if(distance < 55) {
         lCtx.strokeStyle = `hsla(${lDynamicHue}, 100%, 50%, ${(1 - distance/55) * 0.12})`;
         lCtx.lineWidth = 0.5;
         lCtx.beginPath();
         lCtx.moveTo(px, py);
         lCtx.lineTo(p2x, p2y);
         lCtx.stroke();
       }
    });
  });
  lCtx.restore();

  // 3. Precision Line Matrix Rays
  const totalRays = 90; 
  lCtx.save();
  for (let i = 0; i < totalRays; i++) {
    let angle = (i / totalRays) * Math.PI * 2 + (globalMutationTracker * 0.04);
    
    let waveSpike = Math.sin(i * 0.25 + globalMutationTracker * 3.5) * 20 +
                    Math.cos(i * 0.12 - globalMutationTracker * 1.5) * 15;
                    
    let rayLength = Math.max(0, (waveSpike * 0.8) + (bassPulse * 0.4));
    
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    let startX = cx + (lSmoothZoom + 4) * cos;
    let startY = cy + (lSmoothZoom + 4) * sin;
    let endX = cx + (lSmoothZoom + 4 + rayLength) * cos;
    let endY = cy + (lSmoothZoom + 4 + rayLength) * sin;

    let rayGrd = lCtx.createLinearGradient(startX, startY, endX, endY);
    rayGrd.addColorStop(0, `hsla(${lDynamicHue}, 100%, 55%, 0.75)`);
    rayGrd.addColorStop(0.5, `hsla(${lDynamicHue + 30}, 100%, 50%, 0.15)`);
    rayGrd.addColorStop(1, 'rgba(0,0,0,0)');

    lCtx.beginPath();
    lCtx.moveTo(startX, startY);
    lCtx.lineTo(endX, endY);
    lCtx.lineWidth = 1.0; 
    lCtx.strokeStyle = rayGrd;
    lCtx.stroke();
  }
  lCtx.restore();
}

/* ---------------- OVERLAY MANAGEMENT FUNCTIONS ---------------- */
function setStatusBarColor(color) {
    if (themeMeta) themeMeta.setAttribute("content", color);
}

function clearBufferingState() {
    document.querySelector('.visualizer-core-wrap')?.classList.remove('audio-buffering');
}

function showOverlay() {
    // Agar mode toggle unchecked (OFF) hai, to overlay show hi nahi hona chahiye
    if (modeToggleBtn && !modeToggleBtn.checked) return;

    if (audioPlayer && !audioPlayer.paused) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }

        resizeLockCanvas();
        lockOverlay.style.display = "flex";
        setStatusBarColor("#000000");
        renderLockVisuals();
    }
}

function hideOverlay() {
    lockOverlay.style.display = "none";
    setStatusBarColor("#00ffff");
    cancelAnimationFrame(lAnimationId);
    resetOverlayTimer();
    clearBufferingState();
    
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/* -------- HARDWARE EXCLUSIVE COHERENT 1-SECOND LONG-PRESS BYPASS -------- */
const unlockBtn = document.getElementById("unlockBtn");
const badgeText = document.querySelector(".cyber-badge");
let holdTimer;

function handleSecureLockStart(e) {
    e.preventDefault();
    unlockBtn.style.transform = "scale(1.15)";
    unlockBtn.style.background = "rgba(0, 255, 204, 0.3)";
    unlockBtn.style.boxShadow = "0 0 35px rgba(0, 255, 204, 0.6)";
    if(badgeText) {
       badgeText.textContent = "DECRYPTING ENGINE SIGNAL...";
       badgeText.style.color = "#00ffcc";
       badgeText.style.borderColor = "rgba(0, 255, 204, 0.6)";
    }

    holdTimer = setTimeout(() => {
        hideOverlay();
        handleSecureLockEnd();
    }, 1000);
}

function handleSecureLockEnd() {
    clearTimeout(holdTimer);
    unlockBtn.style.transform = "scale(1)";
    unlockBtn.style.background = "rgba(0, 255, 204, 0.02)";
    unlockBtn.style.boxShadow = "0 0 15px rgba(0, 255, 204, 0.05)";
    if(badgeText) {
       badgeText.textContent = "HOLD TO UNLOCK TERMINAL";
       badgeText.style.color = "#ff3300";
       badgeText.style.borderColor = "rgba(255, 51, 0, 0.3)";
    }
}

unlockBtn.addEventListener("mousedown", handleSecureLockStart);
unlockBtn.addEventListener("mouseup", handleSecureLockEnd);
unlockBtn.addEventListener("mouseleave", handleSecureLockEnd);
unlockBtn.addEventListener("touchstart", handleSecureLockStart, {passive: false});
unlockBtn.addEventListener("touchend", handleSecureLockEnd, {passive: true});

/* ---------------- SIDE MENU FUNCTIONS ---------------- */
function hideMenu() { if(sideMenu) sideMenu.classList.add('hidden'); }
function showMenu() { if(sideMenu) sideMenu.classList.remove('hidden'); }

/* ---------------- TIMERS ---------------- */
function resetOverlayTimer(e) {
    if (e && e.type === "scroll") return;
    if (overlayTimer) clearTimeout(overlayTimer);
    
    // UPDATED LOGIC: Jab feature switch ON (checked) ho, sirf tabhi timer chalega
    if (audioPlayer && !audioPlayer.paused && modeToggleBtn && modeToggleBtn.checked) {
        overlayTimer = setTimeout(showOverlay, 12000); 
    }
}

function resetSideMenuTimer() {
    showMenu();
    if (sideMenuTimer) clearTimeout(sideMenuTimer);
    sideMenuTimer = setTimeout(hideMenu, 2000); 
}

/* ---------------- USER ACTIVITY MONITOR ---------------- */
['mousemove', 'keydown', 'touchstart', 'click'].forEach(evt => {
    document.addEventListener(evt, e => {
        resetOverlayTimer(e);
        resetSideMenuTimer();
    }, { passive: true });
});

resetSideMenuTimer();

/* ---------------- UPDATE CONTENT IN REAL-TIME ---------------- */
function updateOverlayContent() {
    const thumbSrc = document.getElementById("Fimg")?.src;
    if (thumbSrc) overlayThumb.src = thumbSrc;

    const songTitle = document.getElementById("vfytitle")?.textContent;
    overlayTitle.textContent = songTitle || "VIVEKFY Ai ACTIVE";

    const curr = document.getElementById("current-time")?.textContent || "0:00";
    const total = document.getElementById("total-time")?.textContent || "0:00";
    if(overlayTime) overlayTime.textContent = `${curr} / ${total}`;
}

if (audioPlayer) {
    audioPlayer.addEventListener('timeupdate', updateOverlayContent);
    audioPlayer.addEventListener('loadedmetadata', updateOverlayContent);
    audioPlayer.addEventListener('play', () => { resetOverlayTimer(); clearBufferingState(); });
    audioPlayer.addEventListener('pause', hideOverlay);
    audioPlayer.addEventListener('ended', hideOverlay);

    audioPlayer.addEventListener('waiting', () => {
        document.querySelector('.visualizer-core-wrap')?.classList.add('audio-buffering');
    });
    audioPlayer.addEventListener('playing', () => {
        clearBufferingState();
    });
    audioPlayer.addEventListener('stalled', () => {
        document.querySelector('.visualizer-core-wrap')?.classList.add('audio-buffering');
    });
}

/* -------- MODE TOGGLE HANDLER -------- */
function toggleFooterVisibility(hide) {
    const action = hide ? 'add' : 'remove';
    if(footer) footer.classList[action]("hide");
    if(progressBar) progressBar.classList[action]("hide");
    if(audioPlayerContainer) audioPlayerContainer.classList[action]("hide");
}

// SWITCH ON / OFF ACTION DETECTOR
if(modeToggleBtn) {
    modeToggleBtn.addEventListener("change", () => {
        if (!modeToggleBtn.checked) {
            // Agar switch OFF ho jaye to chalte huye lockscreen ko instantly close karein
            hideOverlay();
            if (overlayTimer) clearTimeout(overlayTimer);
            toggleFooterVisibility(false);
        } else {
            // ON hote hi dubara idle condition check active karein
            resetOverlayTimer();
        }
    });
}

/* ---------------- PREMIUM COHERENT TOUCH & WHEEL DETECTOR ---------------- */
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    // Agar lock settings hi disabled hai, to extra footer shifts rok do
    if (modeToggleBtn && !modeToggleBtn.checked) return;
    
    touchEndY = e.changedTouches[0].screenY;
    let swipeDistance = touchStartY - touchEndY;

    if (swipeDistance > 40) { 
        toggleFooterVisibility(true); 
    }
    else if (swipeDistance < -40) { 
        toggleFooterVisibility(false); 
    }
}, { passive: true });

window.addEventListener('wheel', (e) => {
    if (modeToggleBtn && !modeToggleBtn.checked) return;

    if (e.deltaY > 0) {
        toggleFooterVisibility(true);
    } else {
        toggleFooterVisibility(false);
    }
}, { passive: true });

/* ---------------- WAKE LOCK CONFIG ---------------- */
async function keepScreenOn() {
    if ('wakeLock' in navigator && audioPlayer && !audioPlayer.paused) {
        try {
            if (!wakeLock) {
                wakeLock = await navigator.wakeLock.request('screen');
                wakeLock.addEventListener('release', () => { wakeLock = null; });
            }
        } catch (err) { 
            console.error("Wake Lock error:", err); 
        }
    }
}

async function releaseWakeLock() {
    if (wakeLock) {
        try {
            await wakeLock.release();
            wakeLock = null;
        } catch (err) {
            console.error("Wake lock release error:", err);
        }
    }
}

if (audioPlayer) {
    audioPlayer.addEventListener('play', keepScreenOn);
    audioPlayer.addEventListener('pause', releaseWakeLock);
    audioPlayer.addEventListener('ended', releaseWakeLock);
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        keepScreenOn();
    }
});


